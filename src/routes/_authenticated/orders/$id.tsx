import { Outlet, createFileRoute } from "@tanstack/react-router"

// Layout for the order detail children (`index` view and `edit` form). The
// detail data is loaded by the child routes so each can fetch what it needs.
export const Route = createFileRoute("/_authenticated/orders/$id")({
  component: Outlet,
})
