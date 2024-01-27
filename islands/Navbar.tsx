let timeBweteenRequests: number;

export default function Navbar() {
  return (
    <nav>
      <div>
        <h3>afamtopshop</h3>
      </div>
      <div>
        <input type="search" placeholder="Buscar..." onInput={search} />
      </div>
    </nav>
  );
}

function search(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  if (timeBweteenRequests) {
    clearTimeout(timeBweteenRequests);
  }
  timeBweteenRequests = setTimeout(() => {
    fetch(`/api/products/${value}`)
      .then((r) => r.json())
      .then((r) => console.log(r));
  }, 500);
}
