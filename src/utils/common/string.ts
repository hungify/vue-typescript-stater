import type { VNode } from 'vue'

interface StringReplacement {
  input: string
  replacements: { [key: string]: string | VNode | JSX.Element }
  pattern: RegExp
}

export const stringReplacement = ({ input, replacements, pattern }: StringReplacement) => {
  const parts = input.split(pattern)
  return parts.map((part) => replacements[part] || part)
}
