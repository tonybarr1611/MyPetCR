import bannerImage from "./assets/dogBanner.png";
import "./Store.css";

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Perro" className="imageBanner" sizes="1vw" />
    </div>
  );
}

export default Banner;
