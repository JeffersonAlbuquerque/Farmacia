import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import s from './ItensDestaque.module.scss';
import ProdutoCard from '../ProdutoCard/ProdutoCard' // Certifique-se de que o ProdutoCard está corretamente importado

const ItensDestaque = ({ medicamentos, adicionarProdutoCarrinho }) => {
    return (
        <section className={s.produtosDestaque}>
            <h2 className={s.sectionTitle}>Medicamentos em Destaque</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={15}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 }
                }}
                className={s.produtosSwiper}
            >
                {Array.isArray(medicamentos) && medicamentos.map((produto) => (
                    <SwiperSlide key={produto.id}>
                        <ProdutoCard
                            produto={produto}
                            onAddToCart={adicionarProdutoCarrinho}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ItensDestaque;
