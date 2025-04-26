import { useState, useEffect } from "react";
import axios from "axios";
import s from '../../Pages/Inicio/inicio.module.scss';

// Componentes separados
import CategoriasNav from '../../components/categorias/CategoriasNav';
import BannerCarousel from '../../components/bannerCarousel/BannerCarousel';
import SecaoItens from '../../components/itensCategoria/ItensDestaque';

// Imagens do Banner
import banner1 from '../../assets/Banners/Banner1.png';
import banner2 from '../../assets/Banners/Banner2.png';
import banner3 from '../../assets/Banners/Banner3.png';
import banner4 from '../../assets/Banners/Banner4.png';
import banner5 from '../../assets/Banners/Banner5.png';
import banner6 from '../../assets/Banners/Banner6.png';

export default function Inicio({ carrinho, setCarrinho }) {
    const [bannerRemedio, setBannerRemedio] = useState([banner1, banner2, banner3, banner4, banner5, banner6]);
    const [medicamentos, setMedicamentos] = useState([]);

    const adicionarProdutoCarrinho = (produtoId, quantidade = 1) => {
        const produtoSelecionado = medicamentos.find(prod => prod.id === produtoId);
        if (!produtoSelecionado) return;

        setCarrinho(prevCarrinho => {
            const existente = prevCarrinho.find(item => item.id === produtoId);
            if (existente) {
                return prevCarrinho.map(item =>
                    item.id === produtoId
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                );
            }
            return [...prevCarrinho, { ...produtoSelecionado, quantidade }];
        });
    };

    useEffect(() => {
        const listarMedicamentos = async () => {
            try {
                const resposta = await axios.get("https://bancodadosfarmacia.onrender.com/produtosCadastrados");
                setMedicamentos(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar medicamento", error);
            }
        };

        listarMedicamentos();
    }, []);

    const categoriasMenu = [
        { nome: "Dor e Febre", id: "dor-febre" },
        { nome: "Infantil", id: "infantil" },
        { nome: "Gripe e Resfriado", id: "gripe-resfriado" },
        { nome: "Vitaminas", id: "vitaminas" },
        { nome: "Primeiros Socorros", id: "primeiros-socorros" },
        { nome: "Beleza", id: "beleza" },
        { nome: "Sistema Digestivo", id: "sistema-digestivo" },
        { nome: "Higiene", id: "higiene" },
        { nome: "Conveniência", id: "conveniencia" },
        { nome: "Analgésicos", id: "analgesicos" }
    ];

    return (
        <main className={s.Main}>
            <CategoriasNav categoriasMenu={categoriasMenu} />

            {/* Usando o BannerCarousel */}
            <BannerCarousel bannerRemedio={bannerRemedio} />

            {/* Usando o MedicamentosDestaque */}
            <SecaoItens
                medicamentos={medicamentos}
                adicionarProdutoCarrinho={adicionarProdutoCarrinho}
            />

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

            {/* Usando o MedicamentosDestaque */}
            <SecaoItens
                medicamentos={medicamentos}
                adicionarProdutoCarrinho={adicionarProdutoCarrinho}
            />
        </main>
    );
}
