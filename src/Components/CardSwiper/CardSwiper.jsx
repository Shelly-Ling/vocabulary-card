import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "./CardSwiper.scss";


// import required modules
import { EffectCards, Navigation } from "swiper";

export default function CardSwiper({data}) {
  console.log('data',data)

  return (
		<>
			<Swiper
				effect={"cards"}
				grabCursor={true}
				modules={[EffectCards, Navigation]}
				className="mySwiper"
				loop={true}
				navigation={true}
			>
				{
					data.map((item,index)=>(
						<SwiperSlide key={item.vocabulary + index}>
						{item?.vocabulary}            
						</SwiperSlide>
					))
				}
			</Swiper>
		</>
	);
}
