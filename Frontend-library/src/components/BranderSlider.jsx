import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import { IoArrowForwardOutline, IoArrowBackOutline } from "react-icons/io5";

import slide_image from "../assets/lib1.jpg";
import slide_image2 from "../assets/lib2.jpg";
import slide_image3 from "../assets/lib3.jpg";
import slide_image4 from "../assets/lib4.jpg";
import slide_image5 from "../assets/lib5.jpg";


import '../App.css'

const BranderSlider = () => {
  return (
    <div className="container">
      <h1 className="heading font-thin">Library Gallery</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container"
      >
        <SwiperSlide>
          <img src={slide_image} alt="slide 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image2} alt="slide 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image3} alt="slide 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image4} alt="slide 4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image5} alt="slide 5" />
        </SwiperSlide>

        {/* ปุ่มเลื่อนซ้ายขวา */}
        <div className="slider-controler right-24">
          <div className="swiper-button-prev slider-arrow">
            <IoArrowBackOutline size={30} />
          </div>
          <div className="swiper-button-next slider-arrow">
            <IoArrowForwardOutline size={30} />
          </div>
        </div>
        {/* Pagination (จุดเล็ก ๆ สำหรับเลือกภาพ) */}
        <div className="swiper-pagination flex justify-center items-center"></div>
      </Swiper>
    </div>
  );
};

export default BranderSlider;
