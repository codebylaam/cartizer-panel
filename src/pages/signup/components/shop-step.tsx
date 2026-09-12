import { StorefrontIcon } from '@phosphor-icons/react/ssr'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { TextInput } from '@astryxdesign/core/TextInput'

import { signupFormOpt } from '../signup-opt'
import { toFieldStatus } from '../field-status'
import { toDomainSlug } from '../signup.zod'
import { withForm } from '@/components/generic-inputs/field-context'

// The shop name is turned into a subdomain by the backend, so preview it
// against the base domain the panel itself is served from.
function getStorefrontPreview(shopName: string) {
  const slug = toDomainSlug(shopName)
  const { hostname, port } = window.location

  const base = hostname.endsWith('.localhost')
    ? 'localhost'
    : hostname.split('.').length > 2
      ? hostname.split('.').slice(1).join('.')
      : hostname

  return `${slug}.${port ? `${base}:${port}` : base}`
}

const ShopStep = withForm({
  ...signupFormOpt,
  render: function ShopStep({ form }) {
    return (
      <FormLayout direction="vertical">
        <form.AppField name="shop_name">
          {(field) => (
            <TextInput
              label="Shop Name"
              placeholder="My Awesome Store"
              description="Customers will see this name, and it sets your storefront address"
              startIcon={StorefrontIcon}
              value={field.state.value}
              onChange={(value) => field.handleChange(value)}
              status={toFieldStatus(field.state.meta)}
              statusVariant="detached"
            />
          )}
        </form.AppField>

        <form.Subscribe selector={(state) => state.values.shop_name}>
          {(shopName) => (
            <VStack gap={1}>
              <Text type="supporting" color="secondary">
                Your storefront will be available at
              </Text>
              <Text weight="semibold">{getStorefrontPreview(shopName)}</Text>
            </VStack>
          )}
        </form.Subscribe>
      </FormLayout>
    )
  },
})

export default ShopStep
