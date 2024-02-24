interface ErrorField {
  resource?: string
  code: string
  field: string
  message: string
}

export interface FormError {
  message: string
  errors: ErrorField[]
}

export interface AppError {
  statusCode: number
  message: string
  error: string
  correlationId: string
  details?: string[] | null | undefined
}
