import { CardVM } from "../presentation/view-model/card-vm.ts";
import ImgCarousel from "./ImgCarousel.tsx";

export default function CardDetail({ data }: { data: CardVM }) {
  return (
    <div className="card row flex-md-row">
      <div className="col-12 col-md-4 pt-3">
        <ImgCarousel id={"card-img-carousel-" + data.id} imgs={data.images!} />
      </div>
      <div className="card-body col-12 col-md-4">
        <h3 className="card-title">{data.title}</h3>
        {/* ↓ CATEGORY ↓ */}
        <small>
          <a href={"category/" + data.category}>{data.category}</a>
        </small>
        {/* ↑ CATEGORY ↑ */}
        <p className="card-text">{data.description}</p>
        {/* ↓ TAGS ↓ */}
        {data.tags ? (
          <div className="small">
            {data.tags.map((tag) => (
              <a href={"tags/" + tag}>#{tag}</a>
            ))}
          </div>
        ) : (
          ""
        )}
        {/* ↑ TAGS↑ ↑ */}
        {/* ↓ URL BUTTONS ↓ */}
        {data.urls ? (
          <>
            <hr />
            <div className="btn-group pb-3">
              {data.urls?.map((url) => (
                <a href={url.url} target="_blank" className="btn btn-primary">
                  {url.shop}
                </a>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
        {/* ↑ URL BUTTONS ↑ */}
      </div>
    </div>
  );
}
