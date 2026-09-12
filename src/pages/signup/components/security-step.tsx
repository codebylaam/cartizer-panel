import { useState } from 'react'
import {
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
} from '@phosphor-icons/react/ssr'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { IconButton } from '@astryxdesign/core/IconButton'
import { InputGroup } from '@astryxdesign/core/InputGroup'
import { TextInput } from '@astryxdesign/core/TextInput'

import { signupFormOpt } from '../signup-opt'
import { toFieldStatus } from '../field-status'
import { withForm } from '@/components/generic-inputs/field-context'

const SecurityStep = withForm({
  ...signupFormOpt,
  render: function SecurityStep({ form }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
      <FormLayout direction="vertical">
        <form.AppField name="password">
          {(field) => (
            <InputGroup
              label="Password"
              description="Use at least 6 characters"
              status={toFieldStatus(field.state.meta)}
            >
              <TextInput
                label="Password"
                isLabelHidden
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                startIcon={LockKeyIcon}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
              <IconButton
                label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </InputGroup>
          )}
        </form.AppField>

        <form.AppField name="confirm_password">
          {(field) => (
            <InputGroup
              label="Confirm Password"
              status={toFieldStatus(field.state.meta)}
            >
              <TextInput
                label="Confirm Password"
                isLabelHidden
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                startIcon={LockKeyIcon}
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
              />
              <IconButton
                label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
                icon={showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            </InputGroup>
          )}
        </form.AppField>
      </FormLayout>
    )
  },
})

export default SecurityStep
