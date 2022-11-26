interface ErrorField {
  resource?: string;
  code: string;
  field: string;
  message: string;
}

export interface FormError {
  message: string;
  errors: ErrorField[];
}
