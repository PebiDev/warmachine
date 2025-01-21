import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leaders/update/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/leaders/update/$id"!</div>
}
