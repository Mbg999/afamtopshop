import { FreshContext } from "$fresh/server.ts";
import Navbar from "../islands/Navbar.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
  return (
    <div class="layout">
      <Navbar />
      <p>layout</p>
      <ctx.Component />
    </div>
  );
}
