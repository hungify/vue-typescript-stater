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
import type { IconifyJSON, IconifyMetaData } from '@iconify/types'

// Installation: npm install --save-dev @iconify/tools @iconify/utils @iconify/json @iconify/iconify

/**
 * Script configuration
 */
interface BundleScriptCustomSVGConfig {
  // Path to SVG files
  dir: string

  // True if icons should be treated as monotone: colors replaced with currentColor
  monotone: boolean

  // Icon set prefix
  prefix: string
}

interface BundleScriptCustomJSONConfig {
  // Path to JSON file
  filename: string

  // List of icons to import. If missing, all icons will be imported
  icons?: string[]
}

interface BundleScriptConfig {
  // Custom SVG to import and bundle
  svg?: BundleScriptCustomSVGConfig[]

  // Icons to bundled from @iconify/json packages
  icons?: string[]

  // List of JSON files to bundled
  // Entry can be a string, pointing to filename or a BundleScriptCustomJSONConfig object (see type above)
  // If entry is a string or object without 'icons' property, an entire JSON file will be bundled
  json?: (string | BundleScriptCustomJSONConfig)[]
}

const sources: BundleScriptConfig = {
  svg: [
    {
      dir: 'src/assets/icons',
      monotone: false,
      prefix: 'icon',
    },
  ],
}

// Iconify component (this changes import statement in generated file)
const component = '@iconify/vue'

// File to save bundle to
const target = join(__dirname, 'icons-bundle.js')

/**
 * Do stuff!
 */
;(async () => {
  let bundle = `import { addCollection } from '${component}';\n\n`

  // Create directory for output if missing
  const dir = dirname(target)
  try {
    await fs.mkdir(dir, {
      recursive: true,
    })
  } catch {
    //
  }

  /**
   * Convert sources.icons to sources.json
   */
  if (sources.icons) {
    const sourcesJSON = sources.json ? sources.json : (sources.json = [])

    // Sort icons by prefix
    const organizedList = organizeIconsList(sources.icons)
    for (const prefix in organizedList) {
      const filename = import.meta.url.replace(
        'build-icons.js',
        `../json/${prefix}.json`,
      )

      sourcesJSON.push({
        filename,
        icons: organizedList[prefix],
      })
    }
  }

  /**
   * Bundle JSON files
   */
  if (sources.json) {
    for (const element of sources.json) {
      const item = element

      // Load icon set
      const filename = typeof item === 'string' ? item : item.filename
      let content = JSON.parse(
        await fs.readFile(filename, 'utf8'),
      ) as IconifyJSON

      // Filter icons
      if (typeof item !== 'string' && item.icons?.length) {
        const filteredContent = getIcons(content, item.icons)
        if (!filteredContent)
          throw new Error(`Cannot find required icons in ${filename}`)

        content = filteredContent
      }

      // Remove metadata and add to bundle
      removeMetaData(content)

      for (const key in content) {
        if (key === 'prefix' && content.prefix === 'tabler') {
          for (const k in content.icons)
            content.icons[k].body = content.icons[k].body.replaceAll(
              'stroke-width="2"',
              'stroke-width="1.5"',
            )
        }
      }

      minifyIconSet(content)
      bundle += `addCollection(${JSON.stringify(content)});\n`
      console.log(`Bundled icons from ${filename}`)
    }
  }

  /**
   * Custom SVG
   */
  if (sources.svg) {
    for (const element of sources.svg) {
      const source = element

      // Import icons
      const iconSet = await importDirectory(source.dir, {
        prefix: source.prefix,
      })

      // Validate, clean up, fix palette and optimise
      await iconSet.forEach(async (name, type) => {
        if (type !== 'icon') return

        // Get SVG instance for parsing
        const svg = iconSet.toSVG(name)
        if (!svg) {
          // Invalid icon
          iconSet.remove(name)

          return
        }

        // Clean up and optimise icons
        try {
          // Clean up icon code
          await cleanupSVG(svg)

          if (source.monotone) {
            // Replace color with currentColor, add if missing
            // If icon is not monotone, remove this code
            await parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (_, colorStr, color) => {
                return !color || isEmptyColor(color) ? colorStr : 'currentColor'
              },
            })
          }

          // Optimise
          await runSVGO(svg)
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
})().catch((error) => {
  console.error(error)
})

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
    delete iconSet[prop]
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

    const name = item.name
    if (!prefixList.includes(name)) prefixList.push(name)
  })

  return sorted
}
