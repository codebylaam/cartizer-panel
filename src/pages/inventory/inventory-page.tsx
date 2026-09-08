import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import generateInventoryListColumns from './columns'
import { Route } from '@/routes/_authenticated/inventory/index'

import { Button } from '@/components/ui/button'
import Module from '@/components/module/module'

export default function InventoryPage() {
  const { t } = useTranslation()
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const columns = useMemo(() => generateInventoryListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t('page.inventory.title', 'Inventory')}</Module.Title>
        <Button
          onClick={() =>
            navigate({ to: '/products/$id', params: { id: 'create' } })
          }
        >
          {t('page.inventory.add', 'Add Stock')}
        </Button>
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
