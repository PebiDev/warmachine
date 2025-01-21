import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/leaders')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/leaders"!</div>
}
