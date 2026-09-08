import { MultiSelector } from "@astryxdesign/core/MultiSelector"

import { useFieldContext } from "./field-context"

import type { MultiSelectorProps } from "@astryxdesign/core/MultiSelector"
import { useTranslation } from "react-i18next"

export type MultiSelectOption = {
  value: string
  label: string
}

export type GenericMultiSelectProps = Omit<
  MultiSelectorProps,
  "value" | "onChange"
>

export function GenericMultiSelect(props: GenericMultiSelectProps) {
  const { t } = useTranslation()
  const field = useFieldContext<Array<string>>()
  const error = field.state.meta.errors.at(0)

  return (
    <MultiSelector
      status={error ? { type: "error", message: t(error.message) } : undefined}
      {...props}
      hasClear={false}
      value={field.state.value}
      onChange={field.handleChange}
    />
  )
}
