import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Text } from "@astryxdesign/core/Text"
import { Card } from "@astryxdesign/core/Card"
import { Icon } from "@astryxdesign/core/Icon"
import { PlusIcon } from "@phosphor-icons/react"
import { Button } from "@astryxdesign/core/Button"
import { VStack } from "@astryxdesign/core/VStack"
import { Layout, LayoutContent, LayoutHeader } from "@astryxdesign/core/Layout"

import { createOrderFormOpt } from "../create-order-opt"
import { ProductSelectModal } from "./product-select-modal"
import { OrderItemRow } from "./order-item-row"
import { computeItemUnitPrice } from "./order-items-utils"

import type { ProductT } from "@/schemas/product"
import type { OrderedVariantOptionPayload } from "@/schemas/order"
import { withForm } from "@/components/generic-inputs/field-context"

type OrderItemsProps = {
  products: Array<ProductT>
}

const OrderItems = withForm({
  ...createOrderFormOpt,
  props: {} as OrderItemsProps,
  render: function ({ form, products }) {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
      <Card>
        <Layout
          header={
            <LayoutHeader>
              <Text type="large">
                {t("create.order.form.items.heading", "Products")}
              </Text>
            </LayoutHeader>
          }
          content={
            <LayoutContent>
              <form.AppField name="items" mode="array">
                {(field) => {
                  // Add a product directly from the modal
                  const handleSelectProduct = (product: ProductT) => {
                    const currentItems = [...field.state.value]

                    const initialVariants: Array<OrderedVariantOptionPayload> =
                      []
                    if (product.variants.length > 0) {
                      product.variants.forEach((variant) => {
                        if (variant.options.length > 0) {
                          const firstOption = variant.options[0]
                          initialVariants.push({
                            title: variant.title,
                            attribute: firstOption.attribute,
                            extra_price: Number(firstOption.extra_price || 0),
                          })
                        }
                      })
                    }

                    const unitPrice = computeItemUnitPrice(
                      product,
                      initialVariants,
                    )

                    const newItemData = {
                      product_id: product.id,
                      product_name: product.name,
                      sku: product.sku || "",
                      unit_price: unitPrice,
                      quantity: 1,
                      variants:
                        initialVariants.length > 0
                          ? initialVariants
                          : undefined,
                    }

                    const emptyIndex = currentItems.findIndex(
                      (item) => !item.product_name,
                    )

                    if (emptyIndex !== -1) {
                      currentItems[emptyIndex] = newItemData
                      field.setValue(currentItems)
                    } else {
                      field.pushValue(newItemData)
                    }
                  }

                  // Commits every variant of an item in a single update. Applying
                  // them one at a time would read a stale `field.state.value`
                  // between calls and drop all but the last change.
                  const handleVariantsChange = (
                    itemIndex: number,
                    product: ProductT,
                    selections: Array<{ title: string; attribute: string }>,
                  ) => {
                    const currentItems = [...field.state.value]
                    const targetItem = { ...currentItems[itemIndex] }

                    const itemVariants: Array<OrderedVariantOptionPayload> = []

                    product.variants.forEach((variant) => {
                      const selection = selections.find(
                        (entry) => entry.title === variant.title,
                      )
                      if (!selection || !selection.attribute) return

                      const selectedOptDef = variant.options.find(
                        (opt) => opt.attribute === selection.attribute,
                      )
                      if (!selectedOptDef) return

                      itemVariants.push({
                        title: variant.title,
                        attribute: selection.attribute,
                        extra_price: Number(selectedOptDef.extra_price || 0),
                      })
                    })

                    targetItem.variants =
                      itemVariants.length > 0 ? itemVariants : undefined
                    targetItem.unit_price = computeItemUnitPrice(
                      product,
                      itemVariants,
                    )

                    currentItems[itemIndex] = targetItem
                    field.setValue(currentItems)
                  }

                  const handleUpdateQuantity = (
                    index: number,
                    quantity: number,
                  ) => {
                    const currentItems = [...field.state.value]
                    currentItems[index] = {
                      ...currentItems[index],
                      quantity,
                    }
                    field.setValue(currentItems)
                  }

                  const validItems = field.state.value.filter(
                    (item) => item.product_name,
                  )

                  return (
                    <VStack gap={3}>
                      {validItems.length === 0 ? (
                        <VStack gap={3}>
                          <Text color="secondary">
                            {t(
                              "create.order.form.items.empty_text",
                              "No products added to order yet.",
                            )}
                          </Text>
                          <Button
                            label={t(
                              "create.order.form.items.select_product_btn",
                              "Select Product",
                            )}
                            type="button"
                            variant="secondary"
                            size="sm"
                            icon={<Icon icon={PlusIcon} size="sm" />}
                            onClick={() => setIsModalOpen(true)}
                          >
                            {t("create.order.form.items.select_product_btn")}
                          </Button>
                        </VStack>
                      ) : (
                        <VStack gap={2}>
                          {field.state.value.map((item, index) => {
                            if (!item.product_name) return null

                            const selectedProduct = products.find(
                              (p) =>
                                p.id === item.product_id ||
                                p.name === item.product_name,
                            )

                            return (
                              <OrderItemRow
                                key={index}
                                item={item}
                                index={index}
                                selectedProduct={selectedProduct}
                                onVariantsChange={handleVariantsChange}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={(idx) => field.removeValue(idx)}
                              />
                            )
                          })}
                          <Button
                            label={t(
                              "create.order.form.items.select_product_btn",
                            )}
                            type="button"
                            variant="secondary"
                            size="sm"
                            icon={<Icon icon={PlusIcon} size="sm" />}
                            onClick={() => setIsModalOpen(true)}
                          >
                            {t("create.order.form.items.select_product_btn")}
                          </Button>
                        </VStack>
                      )}

                      <ProductSelectModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        products={products}
                        itemsValue={field.state.value}
                        onSelectProduct={handleSelectProduct}
                      />
                    </VStack>
                  )
                }}
              </form.AppField>
            </LayoutContent>
          }
        />
      </Card>
    )
  },
})

export default OrderItems
