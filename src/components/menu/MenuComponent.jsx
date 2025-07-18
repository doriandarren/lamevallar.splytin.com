import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const MenuComponent = () => {
  return (
    
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={20}
      pagination={{ clickable: true }}
      navigation
    //   autoplay={{
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   }}
      loop={true}
      className="h-full"
    >
      <SwiperSlide><img src="/images/carta1.jpg" alt="carta1" className="w-full h-full object-cover" /></SwiperSlide>
      <SwiperSlide><img src="/images/carta2.jpg" alt="carta2" className="w-full h-full object-cover" /></SwiperSlide>
    </Swiper>

  )
}
