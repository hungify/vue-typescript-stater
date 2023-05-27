import type { IssueData } from 'zod';
import { z } from 'zod';

export const IMAGE_ISSUES = {
  type: {
    code: z.ZodIssueCode.custom,
    message: 'File is not an image',
    path: ['invalid'],
  },
  mineType: {
    code: z.ZodIssueCode.custom,
    message: 'Invalid file type',
    path: ['mineType'],
  },
  tooBigSize: {
    code: z.ZodIssueCode.too_big,
    type: 'array',
    message: 'File is too big',
    maximum: 1000000, // 1MB
    inclusive: true,
    path: ['maximumSize'],
  },
  tooSmallSize: {
    code: z.ZodIssueCode.too_small,
    type: 'array',
    message: 'File is too small',
    minimum: 1000, // 1KB
    inclusive: true,
    path: ['minimumSize'],
  },
} satisfies Record<string, IssueData>;
