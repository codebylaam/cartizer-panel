import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import generateCategoryListColumns from './columns'
import Module from '@/components/module/module'
import { Button } from '@/components/ui/button'
import { Route } from '@/routes/_authenticated/categories'

export default function CategoriesPage() {
  const { t } = useTranslation()
  const navigate = Route.useNavigate()
  const data = Route.useLoaderData()
  const columns = useMemo(() => generateCategoryListColumns(t), [t])

  return (
    <Module navigate={navigate}>
      <Module.Header>
        <Module.Title>{t('page.category.title')}</Module.Title>
        <Button
          onClick={() =>
            navigate({ to: '/products/$id', params: { id: 'create' } })
          }
        >
          Add Product
        </Button>
      </Module.Header>
      <Module.Content>
        <Module.Filter></Module.Filter>
        <Module.DataTable response={data} columns={columns} />
      </Module.Content>
    </Module>
  )
}
