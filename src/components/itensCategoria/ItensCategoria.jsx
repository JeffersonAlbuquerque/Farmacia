import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import s from './ItensDestaque.module.scss';
import ProdutoCard from '../ProdutoCard/ProdutoCard';

const ItensCategoria = ({ medicamentos, adicionarProdutoCarrinho, categoriasMedicamentos }) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSorteada, setCategoriaSorteada] = useState("");

    // Atualiza a lista de categorias quando o componente receber as categorias da API
    useEffect(() => {
        if (Array.isArray(categoriasMedicamentos)) {
            setCategorias(categoriasMedicamentos);
            sortearCategoria(categoriasMedicamentos); // já sorteia quando carregar
        }
    }, [categoriasMedicamentos]);

    const sortearCategoria = (categoriasParaSortear = categorias) => {
        if (categoriasParaSortear.length > 0) {
            const indiceSorteado = Math.floor(Math.random() * categoriasParaSortear.length);
            const categoriaEscolhida = categoriasParaSortear[indiceSorteado];
            setCategoriaSorteada(categoriaEscolhida);
            console.log(categoriaEscolhida);
        }
    };

    const medicamentosFiltrados = medicamentos.filter(produto => produto.categoria === categoriaSorteada);

    return (
        <section className={s.produtosDestaque}>
            <h2 className={s.sectionTitle}>Medicamentos em Destaque</h2>

            {/* Botão para sortear nova categoria manualmente (opcional) */}
            <button onClick={() => sortearCategoria()} className="p-2 bg-blue-500 text-white rounded mb-4">
                Sortear Nova Categoria
            </button>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 }
                }}
                className={s.produtosSwiper}
            >
                {medicamentosFiltrados.map((produto) => (
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

export default ItensCategoria;
