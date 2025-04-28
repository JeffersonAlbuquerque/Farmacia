import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import s from './carrousel.module.scss';

const BannerCarousel = ({ bannerRemedio }) => {
    return (
        <section className={s.carouselWrapper}>
            <h2 className={s.sectionTitle}>Ofertas Especiais</h2>
            <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop={true}
                spaceBetween={5}
                slidesPerView={1}
                className={s.bannerSwiper}
            >
                {bannerRemedio.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={src}
                            alt={`Oferta especial ${i + 1}`}
                            className={s.bannerImagem}
                            loading="lazy"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default BannerCarousel;
