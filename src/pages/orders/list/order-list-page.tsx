import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import generateOrderListColumns from './columns'
import { Route } from '@/routes/_authenticated/orders/index'

import { Button } from '@/components/ui/button'
import Module from '@/components/module/module'

export default function OrderListPage() {
  const { t } = useTranslation()
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const columns = useMemo(() => generateOrderListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t('page.order.title', 'Orders')}</Module.Title>
        <Button onClick={() => navigate({ to: '/orders/create' })}>
          {t('page.order.add', 'Add Order')}
        </Button>
      </Module.Header>
      <Module.Content>
        <Module.Filter />
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
