import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

interface IProps {
  imageCover: string;
  images: string[];
}
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductSlider({ imageCover, images }: IProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 h-[400px]"
      >
        <SwiperSlide>
          <img
            className="scale-90"
            src={
              imageCover.search("https") !== -1
                ? imageCover.slice(imageCover.search("https"))
                : imageCover
            }
            alt="Nature 1"
          />
        </SwiperSlide>
        {images.map((ele, idx) => (
          <SwiperSlide key={idx}>
            <img
              className="scale-90"
              src={
                ele.search("https") !== -1
                  ? ele.slice(ele.search("https"))
                  : ele
              }
              alt="Nature 2"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-28"
      >
        <SwiperSlide>
          <img
            src={
              imageCover.search("https") !== -1
                ? imageCover.slice(imageCover.search("https"))
                : imageCover
            }
            alt="Nature 1"
          />
        </SwiperSlide>
        {images.map((ele, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={
                ele.search("https") !== -1
                  ? ele.slice(ele.search("https"))
                  : ele
              }
              alt="Nature 2"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
