import { CardVM } from "../presentation/view-model/card-vm.ts";
import Card from "./Card.tsx";

export default function CardGrid({ cards }: { cards: CardVM[] }) {
  return (
    <div className="card-grid">
      {cards.map((c) => (
        <Card key={c.id} data={c} />
      ))}
    </div>
  );
}
