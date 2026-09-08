import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { Button } from '@astryxdesign/core/Button'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'

import { createProductFormOpt } from '../create-product-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const Specification = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()
    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">{t('create.product.form.specification')}</Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="specifications" mode="array">
                  {(field) => {
                    return (
                      <>
                        {field.state.value.map((_, index) => (
                          <FormLayout key={index} direction="horizontal">
                            <form.AppField
                              name={`specifications[${index}].key`}
                              mode="value"
                            >
                              {(keyField) => (
                                <keyField.GenericInput
                                  label={t(
                                    'create.product.form.specifications.key.label',
                                  )}
                                  description={t(
                                    'create.product.form.specifications.key.description',
                                  )}
                                />
                              )}
                            </form.AppField>
                            <form.AppField
                              name={`specifications[${index}].value`}
                              mode="value"
                            >
                              {(valueField) => (
                                <valueField.GenericInput
                                  label={t(
                                    'create.product.form.specifications.value.label',
                                  )}
                                  description={t(
                                    'create.product.form.specifications.value.description',
                                  )}
                                />
                              )}
                            </form.AppField>
                          </FormLayout>
                        ))}

                        <Button
                          label="Create Variant"
                          size={'sm'}
                          onClick={() => {
                            field.pushValue({ key: '', value: '' })
                          }}
                        >
                          {t('create.product.form.add_more')}
                        </Button>
                      </>
                    )
                  }}
                </form.AppField>
              </FormLayout>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default Specification
