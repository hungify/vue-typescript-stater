interface BundleScriptCustomSVGConfig {
  dir: string
  monotone: boolean
  prefix: string
}

interface BundleScriptCustomJSONConfig {
  filename: string

  icons?: string[]
}

export interface BundleScriptConfig {
  // Custom SVG to import and bundle
  svg?: BundleScriptCustomSVGConfig[]

  // Icons to bundled from @iconify/json packages
  icons?: string[]

  // List of JSON files to bundled
  // Entry can be a string, pointing to filename or a BundleScriptCustomJSONConfig object (see type above)
  // If entry is a string or object without 'icons' property, an entire JSON file will be bundled
  json?: (string | BundleScriptCustomJSONConfig)[]
}
