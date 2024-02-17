import { FreshContext, Handlers } from "$fresh/server.ts";
import { GetProductByName } from "../../application/use-cases/get-product-by-name.ts";
import { GetRandomProductsByCategoryNamePaginated } from "../../application/use-cases/get-random-products-by-category-name-paginated.ts";
import { GetRandomProductsByTagNamePaginated } from "../../application/use-cases/get-random-products-by-tag-name-paginated.ts";
import { GetRandomProductsPaginated } from "../../application/use-cases/get-random-products-paginated.ts";
import Card from "../../components/Card.tsx";
import CardDetail from "../../components/CardDetail.tsx";
import { Product } from "../../domain/product.ts";
import { CardVmMapper } from "../../presentation/mappers/card-vm-mapper.ts";

export const handler: Handlers = {
  async GET(_, ctx: FreshContext) {
    try {
      const product = await new GetProductByName().invoke(
        decodeURIComponent(ctx.params.name)
      );
      if (!product) {
        return ctx.renderNotFound({ errorMessage: "Producto no encontrado." });
      }
      const productSuggestions: Product[] = [];

      if (product.categoryName) {
        productSuggestions.push(
          ...(await new GetRandomProductsByCategoryNamePaginated().invoke(
            product.categoryName,
            0,
            10,
            [product.id]
          ))
        );
      }

      if (productSuggestions.length < 10 && product.tags?.length) {
        const getRandomProductsByTagNamePaginated =
          new GetRandomProductsByTagNamePaginated();
        let tagsIndex = 0;
        do {
          if (product.tags[tagsIndex].tagName) {
            productSuggestions.push(
              ...(await getRandomProductsByTagNamePaginated.invoke(
                product.tags[tagsIndex].tagName as string,
                0,
                10 - productSuggestions.length,
                [product.id, ...productSuggestions.map((ps) => ps.id)]
              ))
            );
          }
          tagsIndex++;
        } while (
          productSuggestions.length < 10 &&
          tagsIndex < product.tags.length - 1
        );
      }

      if (productSuggestions.length < 10) {
        productSuggestions.push(
          ...(await new GetRandomProductsPaginated().invoke(
            0,
            10 - productSuggestions.length,
            [product.id, ...productSuggestions.map((ps) => ps.id)]
          ))
        );
      }

      return ctx.render({ product, productSuggestions });
    } catch (_) {
      return ctx.renderNotFound({ errorMessage: "Producto no encontrado." });
    }
  },
};

export default function Products({
  data,
}: {
  data: { product: Product; productSuggestions: Product[] };
}) {
  const cardProduct = CardVmMapper.fromProduct(data.product);
  const cardSuggestions = data.productSuggestions?.map((ps) =>
    CardVmMapper.fromProduct(ps)
  );
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
        {cardSuggestions?.length > 0 ? (
          <>
            <div className="pt-5">
              <h3>Sugerencias</h3>
            </div>
            <hr />
            <div className="row">
              <p>ver como voy a mostrar esto</p>
              {cardSuggestions.map((c) => (
                <div className="col">
                  <Card key={c.id} data={c} />
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
