import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
} from '@astryxdesign/core/Layout'

import { createProductFormOpt } from '../create-product-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const Media = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()
    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('create.product.form.media')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <VStack gap={3}>
                <form.AppField
                  name="medias"
                  children={(field) => (
                    <field.GenericFileUploader
                      label={t('create.product.form.images.label')}
                      accept="image/*"
                      multiple
                    />
                  )}
                />
              </VStack>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default Media
