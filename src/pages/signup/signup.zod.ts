import * as z from 'zod'

// Mirrors the seller phone rule in the backend's `seller.validation.ts`.
export const PHONE_REGEX = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/

export const signupSchema = z.object({
  first_name: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  last_name: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),
  email: z.email('Enter a valid email address'),
  phone: z.string().regex(PHONE_REGEX, 'Enter a valid Bangladeshi phone number'),
  shop_name: z
    .string()
    .min(2, 'Shop name must be at least 2 characters')
    .max(50, 'Shop name must be at most 50 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be at most 100 characters'),
  confirm_password: z.string(),
})

// The API never receives `confirm_password`; it only guards the password step.
export const signupSubmitSchema = signupSchema.refine(
  (values) => values.password === values.confirm_password,
  { message: 'Passwords do not match', path: ['confirm_password'] },
)

export type SignupFormData = z.infer<typeof signupSchema>

// Which fields each wizard step owns. Drives both the Stepper and the
// per-step validation before advancing.
export const SIGNUP_STEP_FIELDS: Array<Array<keyof SignupFormData>> = [
  ['first_name', 'last_name', 'email', 'phone'],
  ['shop_name'],
  ['password', 'confirm_password'],
]

// One schema per step, picked from the same `signupSchema` so the wizard and
// the final submit can never drift apart. These gate the steps; TanStack
// Form's own `validateField` is not used because its return value is not a
// reliable pass/fail signal here (it reports no errors for a mounted invalid
// field and errors for an unmounted one).
export const SIGNUP_STEP_SCHEMAS: Array<z.ZodType> = [
  signupSchema.pick({
    first_name: true,
    last_name: true,
    email: true,
    phone: true,
  }),
  signupSchema.pick({ shop_name: true }),
  signupSchema
    .pick({ password: true, confirm_password: true })
    .refine((values) => values.password === values.confirm_password, {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    }),
]

export const signupDefaultValues: SignupFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  shop_name: '',
  password: '',
  confirm_password: '',
}

// Mirrors `SellerService.toDomainSlug` — the shop name becomes the storefront
// subdomain, which is why the backend rejects duplicate shop names.
export function toDomainSlug(shopName: string) {
  const slug = shopName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'shop'
}
