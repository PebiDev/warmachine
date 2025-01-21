import { CssBaseline } from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

const RootComponent = () => (
  <>
    <CssBaseline />
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>{" "}
      <Link to="/armies" className="[&.active]:font-bold">
        Armies
      </Link>{" "}
      <Link to="/leaders" className="[&.active]:font-bold">
        Leaders
      </Link>
    </div>
    <hr />
    <Outlet />
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
});
