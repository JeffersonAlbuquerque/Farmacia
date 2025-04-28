import { useState, useEffect } from "react";
import axios from "axios";
import s from '../../Pages/Inicio/inicio.module.scss';

// Componentes separados
import Cat from '../../components/categorias/Cat';  // Corrigido para um único nome de componente
import BannerCarousel from '../../components/bannerCarousel/BannerCarousel';
import CategoriasSection from "../../components/categorias/CategoriasSection";
import CategoriasNav from '../../components/categorias/CategoriasNav'
import SecaoItens from '../../components/itensCategoria/ItensDestaque';
import ItensPorCat from '../../components/itensCategoria/ItensCategoria'

// Imagens do Banner
import banner1 from '../../assets/Banners/Banner1.png';
import banner2 from '../../assets/Banners/Banner2.png';
import banner3 from '../../assets/Banners/Banner3.png';
import banner4 from '../../assets/Banners/Banner4.png';
import banner5 from '../../assets/Banners/Banner5.png';
import banner6 from '../../assets/Banners/Banner6.png';

export default function Inicio({ carrinho, setCarrinho }) {
    const [bannerRemedio, setBannerRemedio] = useState([banner1, banner2, banner3, banner4, banner5, banner6]);
    const [categorias, setCategorias] = useState([]);  // Mudando para array vazio
    const [categoriasCadastradas, setCategoriasCadastradas] = useState([])
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

        const listarCategorias = async () => {
            try {
                const resposta = await axios.get("https://bancodadosfarmacia.onrender.com/categorias");
                setCategorias(resposta.data);
            } catch (error) {
                console.error("Erro ao buscar categorias", error);
            }
        };

        listarMedicamentos();
        listarCategorias();
    }, []);



    return (
        <main className={s.Main}>
            <CategoriasNav categorias={Cat} />

            {/* Usando o BannerCarousel */}
            <BannerCarousel bannerRemedio={bannerRemedio} />

            {/* Usando o SecaoItens para exibir medicamentos em destaque */}
            <SecaoItens
                medicamentos={medicamentos}
                adicionarProdutoCarrinho={adicionarProdutoCarrinho}
            />

            {/* Passando setCategorias para Cat */}
            {/* Passando as categorias para o componente CategoriasSection */}
            <CategoriasSection categorias={Cat} />

            <ItensPorCat medicamentos={medicamentos} categoriasCadastradas={categorias} />
            {/* Se necessário, adicione mais seções para exibir medicamentos por categoria */}
        </main>
    );
}
