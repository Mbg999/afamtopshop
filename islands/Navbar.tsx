import { useState } from "preact/hooks";
import { Product } from "../domain/product.ts";

export default function Navbar() {
  const [products, setProducts] = useState([] as Product[]);
  let timeBweteenRequests: number;

  const searchProduct = (event: Event) => {
    const value = (event.target as HTMLInputElement).value.trim();
    if (timeBweteenRequests) {
      clearTimeout(timeBweteenRequests);
    }
    if (value) {
      timeBweteenRequests = setTimeout(() => {
        fetch(`/api/products/${encodeURIComponent(value)}`)
          .then((r) => r.json())
          .then((r) => setProducts(r.ok ? r.data : []));
      }, 500);
    } else {
      setProducts([]);
    }
  };

  return (
    <nav>
      <div>
        <h3>
          <a href="/">afamtopshop</a>
        </h3>
      </div>
      <div>
        <input type="search" placeholder="Buscar..." onInput={searchProduct} />
        {JSON.stringify(products)}
        {products?.length ? (
          <ul>
            {products.map((p) => (
              <li>
                <a href={"/products/" + p.name}>{p.name}</a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
