import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'

import { useFieldContext } from './field-context'

import type { CheckboxInputProps } from '@astryxdesign/core/CheckboxInput'

type GenericCheckBoxProps = Omit<CheckboxInputProps, 'value'>

export function GenericCheckBox(props: GenericCheckBoxProps) {
  const field = useFieldContext<boolean | 'indeterminate'>()

  return (
    <CheckboxInput
      {...props}
      value={!!field.state.value}
      onChange={(checked) => {
        field.setValue(!!checked)
      }}
    />
  )
}
