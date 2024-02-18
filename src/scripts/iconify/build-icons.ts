/* eslint-disable no-console */
/**
 * This is an advanced example for creating icon bundles for Iconify SVG Framework.
 *
 * It creates a bundle from:
 * - All SVG files in a directory.
 * - Custom JSON files.
 * - Iconify icon sets.
 * - SVG framework.
 *
 * This example uses Iconify Tools to import and clean up icons.
 * For Iconify Tools documentation visit https://docs.iconify.design/tools/tools2/
 */
import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

import {
  cleanupSVG,
  importDirectory,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools'
import { getIcons, minifyIconSet, stringToIcon } from '@iconify/utils'
import type { BundleScriptConfig } from './shared.ts'
import type { IconifyJSON, IconifyMetaData } from '@iconify/types'

const sources: BundleScriptConfig = {
  svg: [
    {
      dir: 'src/assets/icons',
      monotone: false,
      prefix: 'custom',
    },
  ],

  icons: [
    // 'mdi:home',
    // 'mdi:account',
    // 'mdi:login',
    // 'mdi:logout',
    // 'octicon:book-24',
    // 'octicon:code-square-24',
  ],

  json: [
    // Custom JSON file
    // 'json/gg.json',
    // // Iconify JSON file (@iconify/json is a package name, /json/ is directory where files are, then filename)
    // {
    //   filename: await import("@iconify-json/fa/icons.json").default,
    //   icons: ["facebook", "google", "twitter", "circle"],
    // },
  ],
}

// Iconify component (this changes import statement in generated file)
// Available options: '@iconify/react' for React, '@iconify/vue' for Vue 3, '@iconify/vue2' for Vue 2, '@iconify/svelte' for Svelte
const component = '@iconify/vue'

const __dirname = new URL('.', import.meta.url).pathname

// File to save bundle to
const target = join(__dirname, 'iconify-bundle.js')
/**
 * Remove metadata from icon set
 */
function removeMetaData(iconSet: IconifyJSON) {
  const props: (keyof IconifyMetaData)[] = [
    'info',
    'chars',
    'categories',
    'themes',
    'prefixes',
    'suffixes',
  ]

  props.forEach((prop) => {
    Reflect.deleteProperty(iconSet, prop)
  })
}

/**
 * Sort icon names by prefix
 */
function organizeIconsList(icons: string[]): Record<string, string[]> {
  const sorted: Record<string, string[]> = Object.create(null)

  icons.forEach((icon) => {
    const item = stringToIcon(icon)
    if (!item) return

    const prefix = item.prefix

    const prefixList = sorted[prefix] ? sorted[prefix] : (sorted[prefix] = [])
    if (!prefixList) throw new Error('Invalid prefix list')

    const name = item.name
    if (!prefixList.includes(name)) prefixList.push(name)
  })

  return sorted
}

async function bootstrap() {
  let bundle = `/* eslint-disable */
/* prettier-ignore */
import { addCollection } from '${component}';\n\n`
  // Create directory for output if missing
  const dir = dirname(target)
  await fs.mkdir(dir, {
    recursive: true,
  })
  /**
   * Convert sources.icons to sources.json
   */
  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = [])
    // Sort icons by prefix
    const organizedList = organizeIconsList(sources.icons)
    for (const [prefix, icons] of Object.entries(organizedList)) {
      const { default: filename } = await import(
        `@iconify-json/json/${prefix}.json`
      )
      sourcesJSON.push({
        filename,
        icons,
      })
    }
  }
  /**
   * Bundle JSON files
   */
  if (sources.json) {
    for (let i = 0; i < sources.json.length; i++) {
      const item = sources.json[i]
      if (!item) throw new Error('Invalid item in sources.json')
      // Load icon set
      const filename = typeof item === 'string' ? item : item.filename
      let content = JSON.parse(await fs.readFile(filename, 'utf8'))
      // Filter icons
      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons)
        if (!filteredContent)
          throw new Error(`Cannot find required icons in ${filename}`)
        content = filteredContent
      }
      // Remove metadata and add to bundle
      removeMetaData(content)
      minifyIconSet(content)
      bundle += `addCollection(${JSON.stringify(content)});\n`
      console.log(`Bundled icons from ${filename}`)
    }
  }
  /**
   * Custom SVG
   */
  if (sources.svg) {
    for (let i = 0; i < sources.svg.length; i++) {
      const source = sources.svg[i]
      if (!source) throw new Error('Invalid item in sources svg')
      // Import icons
      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix,
      })
      // Validate, clean up, fix palette and optimise
      await iconSet.forEach((name, type) => {
        if (type !== 'icon') return
        // Get SVG instance for parsing
        const svg = iconSet.toSVG(name)
        if (!svg) {
          // Invalid icon
          iconSet.remove(name)
          return
        }
        // Clean up and optimize icons
        try {
          // Clean up icon code
          cleanupSVG(svg)
          if (source.monotone) {
            // Replace color with currentColor, add if missing
            // If icon is not monotone, remove this code
            parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (_, colorStr, color) => {
                return !color || isEmptyColor(color) ? colorStr : 'currentColor'
              },
            })
          }
          // Optimize icon
          runSVGO(svg)
        } catch (error) {
          // Invalid icon
          console.error(`Error parsing ${name} from ${source.dir}:`, error)
          iconSet.remove(name)
          return
        }
        // Update icon from SVG instance
        iconSet.fromSVG(name, svg)
      })
      console.log(`Bundled ${iconSet.count()} icons from ${source.dir}`)
      // Export to JSON
      const content = iconSet.export()
      bundle += `addCollection(${JSON.stringify(content)});\n`
    }
  }
  // Save to file
  await fs.writeFile(target, bundle, 'utf8')
  console.log(`Saved ${target} (${bundle.length} bytes)`)
}

await bootstrap()
