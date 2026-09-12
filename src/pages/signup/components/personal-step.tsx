import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  UserIcon,
} from '@phosphor-icons/react/ssr'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { TextInput } from '@astryxdesign/core/TextInput'

import { signupFormOpt } from '../signup-opt'
import { toFieldStatus } from '../field-status'
import { withForm } from '@/components/generic-inputs/field-context'

const PersonalStep = withForm({
  ...signupFormOpt,
  render: function PersonalStep({ form }) {
    return (
      <FormLayout direction="vertical">
        <FormLayout direction="horizontal">
          <form.AppField name="first_name">
            {(field) => (
              <TextInput
                label="First Name"
                placeholder="John"
                startIcon={UserIcon}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                status={toFieldStatus(field.state.meta)}
                statusVariant="detached"
              />
            )}
          </form.AppField>

          <form.AppField name="last_name">
            {(field) => (
              <TextInput
                label="Last Name"
                placeholder="Doe"
                startIcon={UserIcon}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                status={toFieldStatus(field.state.meta)}
                statusVariant="detached"
              />
            )}
          </form.AppField>
        </FormLayout>

        <form.AppField name="email">
          {(field) => (
            <TextInput
              type="email"
              label="Email Address"
              placeholder="john.doe@example.com"
              startIcon={EnvelopeSimpleIcon}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              status={toFieldStatus(field.state.meta)}
              statusVariant="detached"
            />
          )}
        </form.AppField>

        <form.AppField name="phone">
          {(field) => (
            <TextInput
              label="Phone Number"
              placeholder="01XXXXXXXXX"
              description="Bangladeshi mobile number, e.g. 01712345678"
              startIcon={PhoneIcon}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              status={toFieldStatus(field.state.meta)}
              statusVariant="detached"
            />
          )}
        </form.AppField>
      </FormLayout>
    )
  },
})

export default PersonalStep
