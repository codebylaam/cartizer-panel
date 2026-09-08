import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { Button } from '@astryxdesign/core/Button'
import { IconButton } from '@astryxdesign/core/IconButton'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
} from '@astryxdesign/core/Layout'

import { createProductFormOpt } from '../create-product-opt'
import { withForm } from '@/components/generic-inputs/field-context'

const Variants = withForm({
  ...createProductFormOpt,
  render: function ({ form }) {
    const { t } = useTranslation()

    // const medias = form.getFieldValue('medias')

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <VStack>
                <Text type="large">
                  {t('create.product.form.variants.title')}
                </Text>
                <Text type="supporting">
                  {t('create.product.form.variants.description')}
                </Text>
              </VStack>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <FormLayout>
                <form.AppField name="variants" mode="array">
                  {(variantsField) => {
                    const variantList = variantsField.state.value

                    return (
                      <VStack gap={3}>
                        {variantList.length === 0 ? (
                          <VStack
                            padding={8}
                            gap={2}
                            align="center"
                            justify="center"
                          >
                            <Text type="supporting">
                              {t('create.product.form.variants.no_variants')}
                            </Text>
                            <Button
                              label={t(
                                'create.product.form.variants.add_variant',
                              )}
                              icon={<PlusIcon />}
                              type="button"
                              size="sm"
                              onClick={() =>
                                variantsField.pushValue({
                                  title: '',
                                  is_mandatory: false,
                                  options: [
                                    {
                                      attribute: '',
                                      extra_price: 0,
                                      stock_quantity: 0,
                                    },
                                  ],
                                })
                              }
                            />
                          </VStack>
                        ) : (
                          variantList.map((_, variantIndex) => (
                            <Card key={variantIndex}>
                              <FormLayout>
                                <FormLayout direction="horizontal">
                                  <FormLayout>
                                    <form.AppField
                                      name={`variants[${variantIndex}].title`}
                                    >
                                      {(field) => (
                                        <field.GenericInput
                                          isRequired
                                          label={t(
                                            'create.product.form.variants.variant_title.label',
                                          )}
                                          placeholder={t(
                                            'create.product.form.variants.variant_title.placeholder',
                                          )}
                                        />
                                      )}
                                    </form.AppField>

                                    <form.AppField
                                      name={`variants[${variantIndex}].is_mandatory`}
                                    >
                                      {(field) => (
                                        <field.GenericCheckBox
                                          label={t(
                                            'create.product.form.variants.is_mandatory.label',
                                          )}
                                          description={t(
                                            'create.product.form.variants.is_mandatory.description',
                                          )}
                                        />
                                      )}
                                    </form.AppField>
                                  </FormLayout>

                                  <IconButton
                                    label={t('common.delete')}
                                    icon={<TrashIcon />}
                                    type="button"
                                    variant="destructive"
                                    onClick={() =>
                                      variantsField.removeValue(variantIndex)
                                    }
                                  />
                                </FormLayout>

                                {/* Options Section */}
                                <form.AppField
                                  name={`variants[${variantIndex}].options`}
                                  mode="array"
                                >
                                  {(optionsField) => {
                                    const optionList = optionsField.state.value

                                    return (
                                      <FormLayout>
                                        {optionList.map((_, optionIndex) => (
                                          <FormLayout
                                            direction="horizontal"
                                            key={optionIndex}
                                          >
                                            <form.AppField
                                              name={`variants[${variantIndex}].options[${optionIndex}].attribute`}
                                            >
                                              {(optField) => (
                                                <optField.GenericInput
                                                  isRequired
                                                  label={t(
                                                    'create.product.form.variants.options.attribute.label',
                                                  )}
                                                  placeholder={t(
                                                    'create.product.form.variants.options.attribute.placeholder',
                                                  )}
                                                />
                                              )}
                                            </form.AppField>

                                            <form.AppField
                                              name={`variants[${variantIndex}].options[${optionIndex}].extra_price`}
                                            >
                                              {(optField) => (
                                                <optField.GenericInput
                                                  label={t(
                                                    'create.product.form.variants.options.extra_price.label',
                                                  )}
                                                  placeholder={t(
                                                    'create.product.form.variants.options.extra_price.placeholder',
                                                  )}
                                                />
                                              )}
                                            </form.AppField>

                                            <form.AppField
                                              name={`variants[${variantIndex}].options[${optionIndex}].stock_quantity`}
                                            >
                                              {(optField) => (
                                                <optField.GenericInput
                                                  label={t(
                                                    'create.product.form.variants.options.stock_quantity.label',
                                                  )}
                                                  placeholder={t(
                                                    'create.product.form.variants.options.stock_quantity.placeholder',
                                                  )}
                                                />
                                              )}
                                            </form.AppField>

                                            {/* <form.AppField
                                              name={`variants[${variantIndex}].options[${optionIndex}].media_id`}
                                            >
                                              {(optField) => {
                                                const options = medias.map(
                                                  (media, idx) => ({
                                                    value: media.id,
                                                    label: `Image ${idx + 1}`,
                                                  }),
                                                )

                                                return (
                                                  <optField.GenericSelect
                                                    label={t(
                                                      'create.product.form.variants.options.image.label',
                                                    )}
                                                    options={options}
                                                    placeholder={t(
                                                      'create.product.form.variants.options.image.placeholder',
                                                    )}
                                                  />
                                                )
                                              }}
                                            </form.AppField> */}

                                            <IconButton
                                              icon={<TrashIcon />}
                                              label="Remove Variant"
                                              variant="destructive"
                                              onClick={() =>
                                                optionsField.removeValue(
                                                  optionIndex,
                                                )
                                              }
                                            />
                                          </FormLayout>
                                        ))}

                                        <Button
                                          type="button"
                                          size="sm"
                                          onClick={() =>
                                            optionsField.pushValue({
                                              attribute: '',
                                              extra_price: 0,
                                              stock_quantity: 0,
                                            })
                                          }
                                          icon={<PlusIcon />}
                                          label={t(
                                            'create.product.form.variants.options.add_option',
                                          )}
                                        />
                                      </FormLayout>
                                    )
                                  }}
                                </form.AppField>
                              </FormLayout>
                            </Card>
                          ))
                        )}

                        {variantList.length > 0 && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() =>
                              variantsField.pushValue({
                                title: '',
                                is_mandatory: false,
                                options: [
                                  {
                                    attribute: '',
                                    extra_price: 0,
                                    stock_quantity: 0,
                                  },
                                ],
                              })
                            }
                            icon={<PlusIcon />}
                            label={t(
                              'create.product.form.variants.add_variant',
                            )}
                          />
                        )}
                      </VStack>
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

export default Variants
