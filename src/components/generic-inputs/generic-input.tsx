import { useTranslation } from "react-i18next"
import { TextInput } from "@astryxdesign/core/TextInput"

import { useFieldContext } from "./field-context"
import type { TextInputProps } from "@astryxdesign/core/TextInput"

type GenericInputProps = Omit<TextInputProps, "value">

export function GenericInput(props: GenericInputProps) {
  const { t } = useTranslation()
  const field = useFieldContext<string>()
  const error = field.state.meta.errors.at(0)

  return (
    <TextInput
      status={error ? { type: "error", message: t(error.message) } : undefined}
      {...props}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
