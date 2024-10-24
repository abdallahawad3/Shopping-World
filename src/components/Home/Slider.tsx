import { Carousel } from "flowbite-react";

import { img1, img2, img3 } from "../../assets/images/index";
const Slider = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel className="rounded-none">
        <div className="flex h-full items-center justify-center ">
          <img src={img1} alt="Image Slider 1" className="size-full bg-cover" />
        </div>
        <div className="flex h-full items-center justify-center ">
          <img src={img2} alt="Image Slider 1" className="size-full bg-cover" />
        </div>
        <div className="flex h-full items-center justify-center ">
          <img src={img3} alt="Image Slider 1" className="size-full bg-cover" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
