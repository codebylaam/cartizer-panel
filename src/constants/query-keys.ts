export const CategoryQueryKeys = {
  all: ["categories"] as const,
  lists: () => [...CategoryQueryKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...CategoryQueryKeys.lists(), { filters }] as const,
  details: () => [...CategoryQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...CategoryQueryKeys.details(), id] as const,
}

export const ProductQueryKeys = {
  all: ["products"] as const,
  lists: () => [...ProductQueryKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...ProductQueryKeys.lists(), { filters }] as const,
  details: () => [...ProductQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...ProductQueryKeys.details(), id] as const,
}

export const OrderQueryKeys = {
  all: ["orders"] as const,
  lists: () => [...OrderQueryKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...OrderQueryKeys.lists(), { filters }] as const,
  details: () => [...OrderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...OrderQueryKeys.details(), id] as const,
}

export const MediaQueryKeys = {
  lists: () => ["medias", "lists"] as const,
}

export const UserQueryKeys = {
  lists: () => ["users", "lists"] as const,
}

export const DashboardQueryKeys = {
  all: ["dashboard"] as const,
  metrics: () => [...DashboardQueryKeys.all, "metrics"] as const,
  latestOrders: () => [...DashboardQueryKeys.all, "latest-orders"] as const,
}
