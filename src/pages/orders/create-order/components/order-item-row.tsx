import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Item } from '@astryxdesign/core/Item'
import { Icon } from '@astryxdesign/core/Icon'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Selector } from '@astryxdesign/core/Selector'
import { Thumbnail } from '@astryxdesign/core/Thumbnail'
import { IconButton } from '@astryxdesign/core/IconButton'
import { NumberInput } from '@astryxdesign/core/NumberInput'
import { PackageIcon, TrashIcon } from '@phosphor-icons/react'

import { getProductImageUrl } from './order-items-utils'
import type { OrderItemT } from '@/schemas/order'
import type { ProductT } from '@/schemas/product'

type OrderItemRowProps = {
  item: OrderItemT
  index: number
  selectedProduct?: ProductT
  onVariantOptionChange: (
    itemIndex: number,
    product: ProductT,
    variantTitle: string,
    selectedAttribute: string,
  ) => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
}

export function OrderItemRow({
  item,
  index,
  selectedProduct,
  onVariantOptionChange,
  onUpdateQuantity,
  onRemoveItem,
}: OrderItemRowProps) {
  const { t } = useTranslation()
  const imageUrl = getProductImageUrl(selectedProduct)
  const lineTotal = Number(item.unit_price || 0) * Number(item.quantity || 1)

  return (
    <Item
      density="spacious"
      startContent={
        imageUrl ? (
          <Thumbnail
            src={imageUrl}
            alt={item.product_name}
            label={item.product_name}
          />
        ) : (
          <Icon icon={PackageIcon} size="lg" />
        )
      }
      label={
        <VStack gap={1}>
          <Text weight="bold">{item.product_name}</Text>
          <Text type="supporting">
            ৳{Number(item.unit_price).toFixed(2)}
            {item.sku ? ` | SKU: ${item.sku}` : ''}
          </Text>

          {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
            <HStack gap={2}>
              {selectedProduct.variants.map((v, vIdx) => {
                const currentSelectedOpt = item.variants?.find(
                  (iv) => iv.title === v.title,
                )
                const currentAttr = currentSelectedOpt?.attribute || ''

                const options = [
                  ...(!v.is_mandatory
                    ? [
                        {
                          value: '',
                          label: t('create.order.form.items.none', 'None'),
                        },
                      ]
                    : []),
                  ...v.options.map((opt) => ({
                    value: opt.attribute,
                    label: `${opt.attribute}${opt.extra_price ? ` (+৳${opt.extra_price})` : ''}`,
                  })),
                ]

                return (
                  <Selector
                    key={vIdx}
                    label={v.title}
                    isLabelHidden
                    placeholder={v.title}
                    options={options}
                    value={currentAttr}
                    onChange={(val) =>
                      onVariantOptionChange(
                        index,
                        selectedProduct,
                        v.title,
                        String(val),
                      )
                    }
                  />
                )
              })}
            </HStack>
          )}
        </VStack>
      }
      endContent={
        <HStack gap={3} align="center">
          <NumberInput
            label="Quantity"
            isLabelHidden
            value={item.quantity}
            min={1}
            onChange={(val) =>
              onUpdateQuantity(index, Math.max(1, Number(val) || 1))
            }
          />
          <Text weight="bold">৳{lineTotal.toFixed(2)}</Text>
          <IconButton
            label="Remove item"
            variant="ghost"
            size="sm"
            icon={<Icon icon={TrashIcon} size="sm" />}
            onClick={() => onRemoveItem(index)}
          />
        </HStack>
      }
    />
  )
}
