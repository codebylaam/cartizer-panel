import global from '@/translation/global/bn.json'
import media from '@/translation/page/media.bn.json'
import inventory from '@/translation/page/inventory.bn.json'
import order from '@/translation/page/order.bn.json'
import customer from '@/translation/page/customer.bn.json'
import product from '@/translation/page/product.bn.json'
import message from '@/translation/server/message.bn.json'
import category from '@/translation/page/category.bn.json'
import sidebar from '@/translation/sidebar/sidebar.bn.json'
import createProduct from '@/translation/form-validation/product/create-product.bn.json'
import createOrder from '@/translation/form-validation/order/create-order.bn.json'
import createCustomer from '@/translation/form-validation/customer/create-customer.bn.json'
import createCategory from '@/translation/form-validation/category/create-category.bn.json'

const bn = {
  ...global,
  ...message,
  create: {
    product: createProduct,
    order: createOrder,
    customer: createCustomer,
    category: createCategory,
  },
  page: {
    product: product,
    order: order,
    customer: customer,
    inventory: inventory,
    category: category,
    media: media,
  },
  sidebar: sidebar,
  server: {
    message,
  },
}

export default bn
