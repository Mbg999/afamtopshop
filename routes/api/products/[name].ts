import { FreshContext, Handlers } from "$fresh/server.ts";
import { SearchProductsByName } from "../../../application/use-cases/search-products-by-name.ts";
import { ApiBodyResponse } from "../../../presentation/dtos/api-body-response.ts";

export const handler: Handlers = {
  async GET(_, ctx: FreshContext) {
    const body: ApiBodyResponse = {};
    let status: number;
    try {
      const products = await new SearchProductsByName().invoke(
        decodeURIComponent(ctx.params.name),
      );
      body["data"] = products;
      body["ok"] = true;
      status = 200;
    } catch (_) {
      body["ok"] = false;
      status = 500;
    }
    return Response.json(
      body,
      {
        status,
      },
    );
  },
};
