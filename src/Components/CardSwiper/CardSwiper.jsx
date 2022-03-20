import "./CardSwiper.scss";
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper";
import VocabularyCard from "../VocabularyCard/VocabularyCard";

export default function CardSwiper({
	data = [],
	setStyleClass= ""
}) {
	const [ cardSwitch, setCardSwitch ] = useState(false)

	return (
		<>
			<Swiper
				pagination={{
				type: "fraction",
				}}
				effect={"cards"}
				modules={[EffectCards, Navigation, Pagination]}
				className={`mySwiper ${setStyleClass}`}
				loop={data.length > 1}
				navigation={data.length > 1}
				onSlideChange={(e)=>{
					setCardSwitch(!cardSwitch)
					// console.log('e.realIndex',e.realIndex)
				}}
			>
				{
					data.map((item,index)=>(
						<SwiperSlide key={item.vocabulary + index}>
							<VocabularyCard 
								cardData={item} 
								cardSwitch={cardSwitch}
							/>
						</SwiperSlide>
					))
				}
			</Swiper>
		</>
	);
}
