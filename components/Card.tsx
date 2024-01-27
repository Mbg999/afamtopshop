import { CardVM } from "../presentation/view-model/card-vm.ts";

export default function Card({ data }: { data: CardVM }) {
  return (
    <div className="card">
      <h3>{JSON.stringify(data)}</h3>
    </div>
  );
}
