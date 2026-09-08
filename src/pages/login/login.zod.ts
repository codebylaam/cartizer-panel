import * as z from 'zod/v4'

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>
