import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@astryxdesign/core/Text'
import { Item } from '@astryxdesign/core/Item'
import { Icon } from '@astryxdesign/core/Icon'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Button } from '@astryxdesign/core/Button'
import { Thumbnail } from '@astryxdesign/core/Thumbnail'
import { IconButton } from '@astryxdesign/core/IconButton'
import { NumberInput } from '@astryxdesign/core/NumberInput'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { ComplexSelector } from '@astryxdesign/core/ComplexSelector'
import { PackageIcon, TrashIcon } from '@phosphor-icons/react'

import { getProductImageUrl } from './order-items-utils'
import type { OrderItemT, OrderedVariantOptionPayload } from '@/schemas/order'
import type { ProductT, ProductVariantPayload } from '@/schemas/product'

type VariantSelection = Record<string, string>

type VariantSelectionEntry = {
  title: string
  attribute: string
}

type OrderItemRowProps = {
  item: OrderItemT
  index: number
  selectedProduct?: ProductT
  onVariantsChange: (
    itemIndex: number,
    product: ProductT,
    selections: Array<VariantSelectionEntry>,
  ) => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
}

type VariantsEditorProps = {
  variants: Array<ProductVariantPayload>
  value: VariantSelection
  isOpen: boolean
  onCommit: (value: VariantSelection) => void
  onClose: () => void
}

function VariantsEditor({
  variants,
  value,
  isOpen,
  onCommit,
  onClose,
}: VariantsEditorProps) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<VariantSelection>(value)
  const wasOpen = useRef(isOpen)

  // Re-sync the draft each time the popup opens, so a dismissed edit is
  // discarded. Guarded on the closed→open transition: `value` gets a new
  // identity on every commit, and resetting on that would wipe edits in progress.
  useEffect(() => {
    if (isOpen && !wasOpen.current) setDraft(value)
    wasOpen.current = isOpen
  }, [isOpen, value])

  return (
    <VStack gap={4}>
      {variants.map((variant) => (
        <RadioList
          key={variant.title}
          label={variant.title}
          size="sm"
          value={draft[variant.title] ?? ''}
          onChange={(attribute) =>
            setDraft((prev) => ({ ...prev, [variant.title]: attribute }))
          }
        >
          {!variant.is_mandatory && (
            <RadioListItem
              label={t('create.order.form.items.none', 'None')}
              value=""
            />
          )}

          {variant.options.map((option) => (
            <RadioListItem
              key={option.attribute}
              label={option.attribute}
              value={option.attribute}
              startContent={
                option.image_url ? (
                  <Thumbnail
                    src={option.image_url}
                    alt={option.attribute}
                    label={option.attribute}
                  />
                ) : undefined
              }
              endContent={
                option.extra_price ? (
                  <Text weight="bold" type="supporting">
                    +৳{Number(option.extra_price).toFixed(2)}
                  </Text>
                ) : undefined
              }
            />
          ))}
        </RadioList>
      ))}

      <HStack gap={2} justify="end">
        <Button
          label={t('table_global.cancel')}
          type="button"
          variant="secondary"
          size="sm"
          onClick={onClose}
        />
        <Button
          label={t('create.order.form.items.apply', 'Apply')}
          type="button"
          variant="primary"
          size="sm"
          onClick={() => {
            onCommit(draft)
            onClose()
          }}
        />
      </HStack>
    </VStack>
  )
}

type VariantSelectorProps = {
  variants: Array<ProductVariantPayload>
  selected: Array<OrderedVariantOptionPayload>
  onApply: (selections: Array<VariantSelectionEntry>) => void
}

function VariantSelector({
  variants,
  selected,
  onApply,
}: VariantSelectorProps) {
  const { t } = useTranslation()

  const value = useMemo(() => {
    const record: VariantSelection = {}
    selected.forEach((selection) => {
      if (selection.title) record[selection.title] = selection.attribute
    })
    return record
  }, [selected])

  const chosen = variants
    .map((variant) => value[variant.title])
    .filter((attribute): attribute is string => Boolean(attribute))

  return (
    <ComplexSelector<VariantSelection>
      label={t('create.order.form.items.variants', 'Variants')}
      isLabelHidden
      size="sm"
      placeholder={t(
        'create.order.form.items.select_variants',
        'Select variants',
      )}
      triggerLabel={chosen.length > 0 ? chosen.join(' · ') : undefined}
      value={value}
      onChange={(next) =>
        onApply(
          Object.entries(next).map(([title, attribute]) => ({
            title,
            attribute,
          })),
        )
      }
    >
      {(draftValue, commit, close, state) => (
        <VariantsEditor
          variants={variants}
          value={draftValue}
          isOpen={state.isOpen}
          onCommit={commit}
          onClose={close}
        />
      )}
    </ComplexSelector>
  )
}

export function OrderItemRow({
  item,
  index,
  selectedProduct,
  onVariantsChange,
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
        <VStack gap={2}>
          <VStack gap={1}>
            <Text weight="bold">{item.product_name}</Text>
            <Text type="supporting">
              ৳{Number(item.unit_price).toFixed(2)}
              {item.sku ? ` | SKU: ${item.sku}` : ''}
            </Text>
          </VStack>

          {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
            <VariantSelector
              variants={selectedProduct.variants}
              selected={item.variants ?? []}
              onApply={(selections) =>
                onVariantsChange(index, selectedProduct, selections)
              }
            />
          )}
        </VStack>
      }
      endContent={
        <HStack gap={3} align="center">
          <NumberInput
            label={t('create.order.form.items.quantity.label', 'Quantity')}
            isLabelHidden
            value={item.quantity}
            min={1}
            onChange={(val) =>
              onUpdateQuantity(index, Math.max(1, Number(val) || 1))
            }
          />
          <Text weight="bold">৳{lineTotal.toFixed(2)}</Text>
          <IconButton
            label={t('create.order.form.items.remove_item', 'Remove item')}
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
