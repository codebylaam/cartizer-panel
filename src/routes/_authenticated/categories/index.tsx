import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import CategoriesPage from "@/pages/categories/categories-page"
import { Button } from "@astryxdesign/core"
import { Text } from "@astryxdesign/core"

export const Route = createFileRoute("/_authenticated/categories/")({
  component: CategoriesPage,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: () => {},

  errorComponent: ({ error, reset }) => {
    return (
      <div>
        <Text>{error.message}</Text>
        <Button label="reset" onClick={reset}>
          Reset
        </Button>
      </div>
    )
  },
})
