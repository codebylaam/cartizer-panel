import global from '@/translation/global/en.json'
import media from '@/translation/page/media.en.json'
import shop from '@/translation/page/shop.en.json'
import inventory from '@/translation/page/inventory.en.json'
import order from '@/translation/page/order.en.json'
import customer from '@/translation/page/customer.en.json'
import product from '@/translation/page/product.en.json'
import message from '@/translation/server/message.en.json'
import category from '@/translation/page/category.en.json'
import sidebar from '@/translation/sidebar/sidebar.en.json'
import createProduct from '@/translation/form-validation/product/create-product.en.json'
import createOrder from '@/translation/form-validation/order/create-order.en.json'
import createCustomer from '@/translation/form-validation/customer/create-customer.en.json'
import createCategory from '@/translation/form-validation/category/create-category.en.json'

const en = {
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
    shop: shop,
  },
  sidebar: sidebar,
  server: {
    message,
  },
}

export default en
