import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GetProductByName } from "../../application/use-cases/get-product-by-name.ts";
import { SearchProductsByName } from "../../application/use-cases/search-products-by-name.ts";
import { Product } from "../../domain/product.ts";
import { ApiBodyResponse } from "../../presentation/dtos/api-body-response.ts";

export const handler: Handlers = {
  async GET(_, ctx: FreshContext) {
    try {
      const product = await new GetProductByName().invoke(ctx.params.name);
      if (!product) {
        return ctx.renderNotFound({ errorMessage: "Producto no encontrado." });
      }
      return ctx.render({ product });
    } catch (_) {
      return ctx.renderNotFound({ errorMessage: "Producto no encontrado." });
    }
  },
};

export default function Products({ data }: { data: { product: Product } }) {
  return <div>Hello {JSON.stringify(data)}</div>;
}
