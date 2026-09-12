import { Switch } from '@astryxdesign/core/Switch'

import { useFieldContext } from './field-context'

import type { SwitchProps } from '@astryxdesign/core/Switch'

type GenericSwitchProps = Omit<SwitchProps, 'value' | 'onChange'>

export function GenericSwitch(props: GenericSwitchProps) {
  const field = useFieldContext<boolean>()

  return (
    <Switch
      {...props}
      value={Boolean(field.state.value)}
      onChange={(checked) => field.setValue(checked)}
    />
  )
}
