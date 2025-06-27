import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";
import image7 from "../assets/images/image7.png";

const ImageSlider = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-24 px-4 md:px-10 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] overflow-hidden">
      {/* Company Name + Tagline */}
      <div className="text-center mb-14">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold tracking-wide animate-fadeInUp">
          Wise Global Research Pvt. Ltd.
        </h1>
        <p className="text-white text-lg md:text-xl mt-4 animate-fadeInSlow">
          Empowering Investors. Enriching Futures.
        </p>
      </div>

      {/* Slider Heading */}
      <div className="text-center mb-10">
        <h2 className="text-white text-2xl md:text-3xl font-semibold animate-fadeInSlow">
          India’s Most Trusted Stock Market Advisory
        </h2>
      </div>

      {/* Image Slider */}
      <Slider {...settings}>
        {images.map((url, index) => (
          <div key={index} className="px-3">
            <div className="relative overflow-hidden group rounded-2xl shadow-xl transition-transform duration-500 transform-gpu hover:scale-105 will-change-transform backface-hidden border-[2px] border-[#34eb52]">
              <img
                src={url}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                className="w-full h-64 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 rounded-2xl" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;