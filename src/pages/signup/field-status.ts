/**
 * Maps a field's validation state onto a `TextInput`/`InputGroup` status.
 *
 * Two details matter here:
 * - Errors from a form-level Zod validator arrive as Zod issue objects, so they
 *   must be read via `.message`. Joining the array directly renders
 *   "[object Object]".
 * - Validating one wizard step runs the whole form schema, which stamps errors
 *   onto later steps' fields too. Gating on `isTouched` keeps a step from
 *   showing red before the user has had a chance to fill it in.
 */
export function toFieldStatus(meta: {
  isTouched: boolean
  errors: ReadonlyArray<unknown>
}) {
  if (!meta.isTouched || meta.errors.length === 0) return undefined

  const [first] = meta.errors
  const message =
    typeof first === 'string'
      ? first
      : ((first as { message?: string } | null)?.message ?? 'Invalid value')

  return { type: 'error' as const, message }
}
