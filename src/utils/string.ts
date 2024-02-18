import type { VNode } from 'vue'

interface StringReplacement {
  input: string
  replacements: { [key: string]: string | VNode }
  pattern: RegExp
}

export const stringReplacement = ({
  input,
  replacements,
  pattern,
}: StringReplacement) => {
  const parts = input.split(pattern)
  if (parts.length === 1) return input
  return parts.map((part) => replacements[part] || part).join('')
}
