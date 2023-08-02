import { fileSchema } from '#/schemas/file'
import type { ImageIssueData } from '#/types/media'
import { z } from 'zod'
import { isImageFile } from './file'
import { IMAGE_ISSUES } from '#/constants/issue'

export function createStrictSchema<T extends Record<string, z.ZodTypeAny>>(schema: T) {
  return z.object(schema).strict()
}

export function makeResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return createStrictSchema({
    status: z.number(),
    message: z.string(),
    data: schema
  })
}

export const createImageSchema = (data: ImageIssueData) => {
  return fileSchema.superRefine(async (file, ctx) => {
    const { success } = await isImageFile(file)
    if (!success) {
      ctx.addIssue(data?.invalid?.issue || IMAGE_ISSUES.type)
    }
    if (Array.isArray(data.mineType.value) && !data.mineType.value.includes(file.type)) {
      ctx.addIssue(data.mineType.issue || IMAGE_ISSUES.mineType)
    }

    if (data.maximumSize && file.size > data.maximumSize.value) {
      ctx.addIssue(data.maximumSize?.issue || IMAGE_ISSUES.tooBigSize)
    }

    if (data.minimumSize && file.size < data.minimumSize.value) {
      ctx.addIssue(data.minimumSize?.issue || IMAGE_ISSUES.tooSmallSize)
    }
  })
}
