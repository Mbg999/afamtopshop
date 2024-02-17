import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GetProductByName } from "../../application/use-cases/get-product-by-name.ts";
import { SearchProductsByName } from "../../application/use-cases/search-products-by-name.ts";
import CardDetail from "../../components/CardDetail.tsx";
import { Product } from "../../domain/product.ts";
import { ApiBodyResponse } from "../../presentation/dtos/api-body-response.ts";
import { CardVmMapper } from "../../presentation/mappers/card-vm-mapper.ts";
import { CardVM } from "../../presentation/view-model/card-vm.ts";

export const handler: Handlers = {
  async GET(_, ctx: FreshContext) {
    try {
      const product = await new GetProductByName().invoke(
        decodeURIComponent(ctx.params.name)
      );
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
  const cardProduct: CardVM = CardVmMapper.fromProduct(data.product);
  return (
    <div>
      {/* ↓ BREADCRUMB ↓ */}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Inicio</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {data.product.name}
          </li>
        </ol>
      </nav>
      {/* ↑ BREADCRUMB ↑ */}
      <div>
        <CardDetail data={cardProduct} />
        <div className="pt-5">
          <h3>Sugerencias</h3>
        </div>
        <hr />
      </div>
    </div>
  );
}
