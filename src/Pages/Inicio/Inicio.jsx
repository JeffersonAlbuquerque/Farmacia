import { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from "axios";
// Estilos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

import s from './inicio.module.scss';
//Carrousel

import banner1 from '../../assets/Banners/Banner1.png'
import banner2 from '../../assets/Banners/Banner2.png'
import banner3 from '../../assets/Banners/Banner3.png'
import banner4 from '../../assets/Banners/Banner4.png'
import banner5 from '../../assets/Banners/Banner5.png'
import banner6 from '../../assets/Banners/Banner6.png'

import prod1 from '../../assets/Produtos/Prod1.jpg'
import prod2 from '../../assets/Produtos/Prod2.jpg'
import prod3 from '../../assets/Produtos/Prod3.jpg'
import prod4 from '../../assets/Produtos/Prod4.jpg'
import prod5 from '../../assets/Produtos/Prod5.jpg'

export default function Inicio() {
    // Estados (mantidos como no original)
    const [bannerRemedio, setbannerRemedio] = useState([banner1, banner2, banner3, banner4, banner5, banner6]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [addCart, setAddCart] = useState([]);

    // Função para adicionar ao carrinho com quantidade
    const adicionarProdutoCarrinho = (produtoId, quantidade = 1) => {
        const produtoSelecionado = medicamentos.find(prod => prod.id === produtoId);
        if (produtoSelecionado) {
            const itemsToAdd = Array(quantidade).fill(produtoSelecionado);
            setAddCart(prev => [...prev, ...itemsToAdd]);
        }
    };

    // Função para listar medicamentos (mantida como no original)
    const listarMedicamentos = async () => {
        try {
            const resposta = await axios.get("https://bancodadosfarmacia.onrender.com/produtosCadastrados");
            setMedicamentos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar medicamento", error);
        }
    };

    useEffect(() => {
        listarMedicamentos();
    }, []);

    // Categorias para navegação
    const categoriasMenu = [
        { nome: "Dor e Febre", id: "dor-febre" },
        { nome: "Infantil", id: "infantil" },
        { nome: "Gripe e Resfriado", id: "gripe-resfriado" },
        { nome: "Vitaminas", id: "vitaminas" },
        { nome: "Primeiros Socorros", id: "primeiros-socorros" },
        { nome: "Beleza", id: "beleza" },
        { nome: "Sistema Digestivo", id: "sistema-digestivo" },
        { nome: "Higiene", id: "higiene" },
        { nome: "Conveniência", id: "conveniencia" }
    ];

    return (
        <main className={s.Main}>
            {/* Navegação por categorias */}
            <nav className={s.categoriasNav}>
                <h2 className={s.screenReaderOnly}>Navegação por categorias</h2>
                <ul>
                    {categoriasMenu.map((categoria) => (
                        <li key={categoria.id}>
                            <a href={`#${categoria.id}`} className={s.categoriaLink}>
                                {categoria.nome}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Carrossel de banners */}
            <section className={s.carouselWrapper}>
                <h2 className={s.sectionTitle}>Ofertas Especiais</h2>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
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

            {/* Seção de produtos em destaque */}
            <section className={s.produtosDestaque}>
                <h2 className={s.sectionTitle}>Medicamentos em Destaque</h2>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 }
                    }}
                    className={s.produtosSwiper}
                >
                    {medicamentos.map((produto) => (
                        <SwiperSlide key={produto.id}>
                            <ProdutoCard
                                produto={produto}
                                onAddToCart={adicionarProdutoCarrinho}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Seção de categorias (exemplo adicional) */}
            <section className={s.categoriasSection}>
                <h2 className={s.sectionTitle}>Navegue por Categorias</h2>
                <div className={s.categoriasGrid}>
                    {categoriasMenu.map((categoria) => (
                        <a
                            href={`#${categoria.id}`}
                            key={categoria.id}
                            className={s.categoriaCard}
                        >
                            <h3>{categoria.nome}</h3>
                            <span>Ver produtos</span>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}

// Componente de Card de Produto separado para melhor organização
function ProdutoCard({ produto, onAddToCart }) {
    const [quantidade, setQuantidade] = useState(1);

    const aumentarQuantidade = () => setQuantidade(prev => prev + 1);
    const diminuirQuantidade = () => setQuantidade(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <article className={s.card}>
            <img
                src={produto.img_url}
                alt={produto.nome}
                className={s.imgProduto}
                loading="lazy"
            />
            <div className={s.infor}>
                <p className={s.categoria}>{produto.categoria_nome}</p>
                <h3 className={s.desc}>{produto.nome}</h3>
                <div className={s.precoWrapper}>
                    <p className={s.preco}>R$ {produto.preco.toFixed(2)}</p>
                    <p className={s.desconto}>12% OFF</p>
                </div>
                {produto.controlado && (
                    <p className={s.controlado}>Produto Controlado</p>
                )}
            </div>

            <div className={s.campoCompra}>
                <div className={s.campoCompraDois}>
                    <button
                        className={s.btnAtribuir}
                        onClick={diminuirQuantidade}
                        aria-label="Diminuir quantidade"
                    >
                        -
                    </button>
                    <p className={s.quantidade}>{quantidade}</p>
                    <button
                        className={s.btnAtribuir}
                        onClick={aumentarQuantidade}
                        aria-label="Aumentar quantidade"
                    >
                        +
                    </button>
                </div>
                <button
                    className={s.Comprar}
                    onClick={() => onAddToCart(produto.id, quantidade)}
                    aria-label={`Adicionar ${quantidade} ${produto.nome} ao carrinho`}
                >
                    Comprar
                </button>
            </div>
        </article>
    );
}