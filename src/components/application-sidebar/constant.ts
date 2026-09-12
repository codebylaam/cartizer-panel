import {
  BasketIcon,
  CirclesFourIcon,
  GearIcon,
  ImageIcon,
  PackageIcon,
  PlusIcon,
  TShirtIcon,
  TreeViewIcon,
  UserIcon,
} from '@phosphor-icons/react'
import type { TFunction } from 'i18next'

export const getSidebarDashboardLinks = (t: TFunction) => {
  return [{ name: t('sidebar.dashboard.title'), href: '/dashboard' }]
}

export const getSidebarProductLinks = (t: TFunction) => {
  return [
    { name: t('sidebar.product.list'), icon: TShirtIcon, href: '/products' },
    {
      name: t('sidebar.product.create'),
      icon: PlusIcon,
      href: '/products/create',
    },
  ]
}

export const getSidebarCustomerLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.customer.title', 'Customer'),
      icon: UserIcon,
      href: '/customers',
    },
  ]
}

export const getSidebarInventoryLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.inventory.title'),
      icon: BasketIcon,
      href: '/inventory',
    },
  ]
}

export const getSidebarOrderLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.order.list'),
      href: '/orders',
    },
    {
      name: t('sidebar.order.create'),
      href: '/orders/create',
    },
  ]
}

export const getSidebarMediaLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.media.title'),
      href: '/medias',
    },
  ]
}

export const getSidebarSettingLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.settings.shop'),
      href: '/shop/settings',
    },
    {
      name: t('sidebar.settings.general'),
      href: '/settings/general',
    },
    {
      name: t('sidebar.settings.shipping'),
      href: '/settings/shipping',
    },
    {
      name: t('sidebar.settings.payment'),
      href: '/settings/payment',
    },
  ]
}

export const getSidebarCategoryLinks = (t: TFunction) => {
  return [
    {
      name: t('sidebar.category.title'),
      icon: TShirtIcon,
      href: '/categories',
    },
  ]
}

export const getSidebarLinks = (t: TFunction) => {
  return [
    {
      title: t('sidebar.dashboard.title'),
      icon: CirclesFourIcon,
      links: getSidebarDashboardLinks(t),
    },
    {
      title: t('sidebar.product.title'),
      icon: TShirtIcon,
      links: getSidebarProductLinks(t),
    },
    {
      title: t('sidebar.order.title'),
      icon: PackageIcon,
      links: getSidebarOrderLinks(t),
    },
    {
      title: t('sidebar.customer.title', 'Customer'),
      icon: UserIcon,
      links: getSidebarCustomerLinks(t),
    },
    {
      title: t('sidebar.category.title'),
      icon: TreeViewIcon,
      links: getSidebarCategoryLinks(t),
    },
    {
      title: t('sidebar.inventory.title'),
      icon: BasketIcon,
      links: getSidebarInventoryLinks(t),
    },
    {
      title: t('sidebar.media.title'),
      icon: ImageIcon,
      links: getSidebarMediaLinks(t),
    },
    {
      title: t('sidebar.settings.title'),
      icon: GearIcon,
      links: getSidebarSettingLinks(t),
    },
  ]
}
