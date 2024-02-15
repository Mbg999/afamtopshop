import { CardVM } from "../presentation/view-model/card-vm.ts";
import Card from "./Card.tsx";

export default function CardGrid({ cards }: { cards: CardVM[] }) {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-4 p-2">
      {cards.map((c) => (
        <div className="col">
          <Card key={c.id} data={c} />
        </div>
      ))}
    </div>
  );
}
