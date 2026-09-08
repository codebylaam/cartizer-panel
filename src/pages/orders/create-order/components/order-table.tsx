import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { createOrderFormOpt } from '../create-order-opt'
import type { ColumnDef } from '@tanstack/react-table'
import type { ProductT } from '@/schemas/product'

import type { OrderItemT } from '@/schemas/order'
import { withForm } from '@/components/generic-inputs/field-context'
import ReactTable from '@/components/react-table'

const columnHelper = createColumnHelper<OrderItemT>()

const OrderTable = withForm({
  ...createOrderFormOpt,
  props: { products: [] as Array<ProductT> },
  render: function ({ form, products }) {
    const columns: Array<ColumnDef<OrderItemT>> = [
      columnHelper.display({
        header: 'Product',
        id: 'product',
        cell: (props) => {
          const product = products.find(
            (p) => p.id === props.row.original.product_id,
          )
          if (product) {
            return (
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 object-contain rounded-md"
                  src={product.medias[0]?.url}
                  alt={props.row.original.product_name}
                />
                <div>
                  <p className="text-sm font-medium">
                    {props.row.original.product_name}
                  </p>
                  <p className="text-xs">{props.row.original.unit_price}</p>
                  <form.AppField
                    mode="array"
                    name={`items[${props.row.index}].variants`}
                    children={(field) => {
                      console.log(field)
                      return <>hello</>
                    }}
                  />
                </div>
              </div>
            )
          }
          return null
        },
      }),
      columnHelper.display({
        header: 'Quantity',
        id: 'quantity',
        cell: (props) => (
          <form.AppField
            name={`items[${props.row.index}].quantity`}
            children={(field) => {
              return <field.GenericInput className="w-10 h-6" label="" />
            }}
          />
        ),
      }),
      columnHelper.display({
        header: 'Total',
        id: 'total',
        cell: (props) => (
          <span>
            {props.row.original.unit_price * props.row.original.quantity}
          </span>
        ),
      }),
    ]

    const table = useReactTable({
      columns,
      data: form.state.values.items,
      getCoreRowModel: getCoreRowModel(),
    })

    return <ReactTable table={table} />
  },
})

export default OrderTable
