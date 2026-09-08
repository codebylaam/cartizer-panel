import { useTranslation } from 'react-i18next'
import { HStack } from '@astryxdesign/core/HStack'
import { useEffect, useRef, useState } from 'react'
import { Selector } from '@astryxdesign/core/Selector'
import { TextInput } from '@astryxdesign/core/TextInput'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import type { PropsWithChildren } from 'react'

import { useDebounce } from '@/hooks/use-debounce'
import { useModuleContext } from '@/components/module/context'

type FilterProps = PropsWithChildren<{
  placeholder?: string
  defaultValue?: string
  delay?: number
}>

export function Filter({
  children,
  placeholder,
  defaultValue = '',
  delay = 400,
}: FilterProps) {
  const { t } = useTranslation()
  const { navigate } = useModuleContext()
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  const debouncedSearchTerm = useDebounce(searchTerm, delay)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    navigate?.({
      to: '.',
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        search: debouncedSearchTerm || undefined,
        page: 1,
      }),
    })
  }, [debouncedSearchTerm, navigate])

  return (
    <HStack gap={2} align="center">
      <TextInput
        label="Search"
        isLabelHidden
        startIcon={<MagnifyingGlassIcon />}
        placeholder={placeholder || `${t('search')}...`}
        value={searchTerm}
        onChange={(val) => setSearchTerm(val)}
      />
      {children}
    </HStack>
  )
}

type FilterSelectProps = {
  options: Array<{ label: string; value: string }>
  filter_key: string
  placeholder?: string
}
export function Select({
  options,
  filter_key,
  placeholder,
}: FilterSelectProps) {
  const { navigate } = useModuleContext()
  return (
    <Selector
      label={filter_key}
      isLabelHidden
      placeholder={placeholder}
      options={options}
      onChange={(value) => {
        navigate?.({
          to: '.',
          search: (prev: Record<string, unknown>) => ({
            ...prev,
            [filter_key]: value || undefined,
            page: 1,
          }),
        })
      }}
    />
  )
}

Filter.Select = Select
