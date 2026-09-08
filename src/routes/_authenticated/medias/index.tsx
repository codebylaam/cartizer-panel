import { createFileRoute } from "@tanstack/react-router"

import { filterSchema } from "@/schemas/filter"
import MediasPage from "@/pages/medias/medias-page"
import { Button, Text } from "@astryxdesign/core"

export const Route = createFileRoute("/_authenticated/medias/")({
  component: MediasPage,
  validateSearch: filterSchema,
  loaderDeps: ({ search }) => search,
  loader: () => {},

  errorComponent: ({ error, reset }) => {
    return (
      <div>
        <Text>{error.message}</Text>
        <Button label="Reset" onClick={reset}>
          Reset
        </Button>
      </div>
    )
  },
})
