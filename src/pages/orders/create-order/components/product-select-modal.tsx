import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CheckIcon,
  MagnifyingGlassIcon,
  PackageIcon,
} from '@phosphor-icons/react'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import { Layout, LayoutContent } from '@astryxdesign/core/Layout'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Button } from '@astryxdesign/core/Button'
import { List, ListItem } from '@astryxdesign/core/List'
import { Thumbnail } from '@astryxdesign/core/Thumbnail'
import { Icon } from '@astryxdesign/core/Icon'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'

import { getProductImageUrl } from './order-items-utils'
import type { ProductT } from '@/schemas/product'
import type { OrderItemT } from '@/schemas/order'

type ProductSelectModalProps = {
  isOpen: boolean
  onClose: () => void
  products: Array<ProductT>
  itemsValue: Array<OrderItemT>
  onSelectProduct: (product: ProductT) => void
}

export function ProductSelectModal({
  isOpen,
  onClose,
  products,
  itemsValue,
  onSelectProduct,
}: ProductSelectModalProps) {
  const { t } = useTranslation()
  const [modalSearch, setModalSearch] = useState<string>('')

  // Filter products by search query
  const filteredProducts = products.filter((product) => {
    const q = modalSearch.toLowerCase().trim()
    if (!q) return true
    return (
      product.name.toLowerCase().includes(q) ||
      (product.sku && product.sku.toLowerCase().includes(q))
    )
  })

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setModalSearch('')
      onClose()
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      width={600}
      purpose="form"
    >
      <Layout
        header={
          <DialogHeader
            title={t(
              'create.order.form.items.select_product.modal_title',
              'Select Products',
            )}
            subtitle={t(
              'create.order.form.items.select_product.modal_description',
              'Browse and select products to add to order',
            )}
            onOpenChange={handleOpenChange}
          />
        }
        content={
          <LayoutContent>
            <VStack gap={3}>
              <TextInput
                label={t(
                  'create.order.form.items.search_placeholder',
                  'Search products...',
                )}
                isLabelHidden
                placeholder={t(
                  'create.order.form.items.select_product.search_placeholder',
                  'Search products by name or SKU...',
                )}
                value={modalSearch}
                onChange={(val) => setModalSearch(val)}
                startIcon={<Icon icon={MagnifyingGlassIcon} size="sm" />}
              />

              {filteredProducts.length === 0 ? (
                <Text color="secondary">
                  {t(
                    'create.order.form.items.select_product.no_results',
                    'No products found',
                  )}
                </Text>
              ) : (
                <List>
                  {filteredProducts.map((product) => {
                    const imageUrl = getProductImageUrl(product)
                    const isAlreadyAdded = itemsValue.some(
                      (item) =>
                        item.product_id === product.id ||
                        item.product_name === product.name,
                    )

                    return (
                      <ListItem
                        key={product.id}
                        startContent={
                          imageUrl ? (
                            <Thumbnail
                              src={imageUrl}
                              alt={product.name}
                              label={product.name}
                            />
                          ) : (
                            <Icon icon={PackageIcon} size="md" />
                          )
                        }
                        label={product.name}
                        description={t('create.order.form.items.in_stock', {
                          count: product.stock_quantity,
                          defaultValue: `${product.stock_quantity} in stock`,
                        })}
                        endContent={
                          <HStack gap={3} align="center">
                            <Text weight="bold">
                              ৳{Number(product.price || 0).toFixed(2)}
                            </Text>
                            <Button
                              label={
                                isAlreadyAdded
                                  ? t(
                                      'create.order.form.items.added',
                                      'Added',
                                    )
                                  : t(
                                      'create.order.form.items.select',
                                      'Select',
                                    )
                              }
                              type="button"
                              size="sm"
                              isDisabled={isAlreadyAdded}
                              variant={
                                isAlreadyAdded ? 'secondary' : 'primary'
                              }
                              icon={
                                isAlreadyAdded ? (
                                  <Icon icon={CheckIcon} size="sm" />
                                ) : undefined
                              }
                              onClick={() => {
                                onSelectProduct(product)
                                onClose()
                              }}
                            />
                          </HStack>
                        }
                      />
                    )
                  })}
                </List>
              )}
            </VStack>
          </LayoutContent>
        }
      />
    </Dialog>
  )
}
