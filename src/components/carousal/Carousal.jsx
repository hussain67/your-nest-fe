import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
const Carousal = ({ photos }) => {
	SwiperCore.use([Autoplay, Navigation, Pagination]);

	return (
		<Swiper
			slidesPerView={1}
			navigation
			pagination={{ type: "progressbar" }}
			effect="fade"
			modules={[EffectFade]}
			autoplay={{ delay: 3000 }}
		>
			{photos?.map((url, index) => (
				<SwiperSlide key={index}>
					<div
						className="slider"
						style={{
							background: `url(${photos[index]}) center no-repeat`,

							backgroundSize: "cover"
						}}
					></div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Carousal;
