import { useTranslation } from "react-i18next"
import { TextArea } from "@astryxdesign/core/TextArea"
import type { TextAreaProps } from "@astryxdesign/core/TextArea"

import { useFieldContext } from "./field-context"

type GenericTextareaProps = Omit<TextAreaProps, "value">

export function GenericTextarea(props: GenericTextareaProps) {
  const { t } = useTranslation()
  const field = useFieldContext<string>()
  const error = field.state.meta.errors.at(0)

  return (
    <TextArea
      {...props}
      value={field.state.value}
      onChange={field.handleChange}
      status={error ? { type: "error", message: t(error.message) } : undefined}
    />
  )
}
