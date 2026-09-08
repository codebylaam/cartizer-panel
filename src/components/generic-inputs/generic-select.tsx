import { useTranslation } from "react-i18next"
import { Selector } from "@astryxdesign/core/Selector"

import { useFieldContext } from "./field-context"
import type { SelectorProps } from "@astryxdesign/core/Selector"

type GenericSelectProps = Omit<SelectorProps, "value">

export function GenericSelect(props: GenericSelectProps) {
  const { t } = useTranslation()
  const field = useFieldContext<string>()
  const error = field.state.meta.errors.at(0)

  return (
    <Selector
      status={error ? { type: "error", message: t(error.message) } : undefined}
      {...props}
      hasClear={false}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
