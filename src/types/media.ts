import type { IssueData } from 'zod'
import type { LooseAutoComplete } from './utils'

export interface ImageIssueData {
  invalid?: {
    issue?: IssueData
  }
  mineType: {
    value: LooseAutoComplete<'image/png' | 'image/jpeg' | 'image/jpg'>[] | 'image/*'
    issue?: IssueData
  }
  minimumSize?: {
    value: number
    issue?: IssueData
  }
  maximumSize?: {
    value: number
    issue?: IssueData
  }
  width?: {
    value: number
    issue?: IssueData
  }
  height?: {
    value: number
    issue?: IssueData
  }
}
