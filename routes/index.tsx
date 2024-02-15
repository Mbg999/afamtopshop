import { GetLatestProductsPaginated } from "../application/use-cases/get-latest-products-paginated.ts";
import CardGrid from "../components/CardGrid.tsx";
import { CardVmMapper } from "../presentation/mappers/card-vm-mapper.ts";

export default async function Prueba() {
  const products = await new GetLatestProductsPaginated().invoke(0);
  const cards = products.map((p) => CardVmMapper.fromProduct(p));
  return (
    <div>
      <CardGrid cards={cards} />
    </div>
  );
}
