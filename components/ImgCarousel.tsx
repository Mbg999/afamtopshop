import { ImageVM } from "../presentation/view-model/image.ts";

export default function ImgCarousel({
  imgs,
  id,
}: {
  imgs: ImageVM[];
  id: string;
}) {
  return (
    <div id={id} class="carousel slide">
      <div class="carousel-inner">
        {imgs.map((img, i) => (
          <div className={"carousel-item " + (i == 0 ? "active" : "")}>
            <img
              src={img.url}
              alt={img.alt}
              title={img.title}
              className="d-block w-100 card-carousel-img"
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={"#" + id}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target={"#" + id}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
