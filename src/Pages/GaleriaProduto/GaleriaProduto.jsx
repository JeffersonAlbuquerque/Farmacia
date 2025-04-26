import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import s from './galeriaProduto.module.scss';

const GaleriaProduto = ({ adicionarProdutoCarrinho }) => {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [imagemSelecionada, setImagemSelecionada] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const resposta = await axios.get("https://bancodadosfarmacia.onrender.com/produtosCadastrados");
                const produtoEncontrado = resposta.data.find(p => String(p.id) === id);
                setProduto(produtoEncontrado);
                if (produtoEncontrado) {
                    setImagemSelecionada(produtoEncontrado.img_url);
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes do produto", error);
            } finally {
                setCarregando(false);
            }
        };

        buscarProduto();
    }, [id]);

    const abrirModal = () => {
        setModalAberto(true);
        document.body.style.overflow = 'hidden';
    };

    const fecharModal = () => {
        setModalAberto(false);
        document.body.style.overflow = 'auto';
    };

    /*const aumentarQuantidade = () => {
        if (quantidade < (produto?.quantidade || 10)) {
            setQuantidade(quantidade + 1);
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    };*/

    /*const adicionarAoCarrinho = () => {
        adicionarProdutoCarrinho(produto.id, quantidade);
        setQuantidade(1);
    };*/

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') fecharModal();
        };
        if (modalAberto) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalAberto]);

    if (carregando) return (
        <div className={s.carregando}>
            <div className={s.spinner}></div>
            <p>Carregando informações do produto...</p>
        </div>
    );
    
    if (!produto) return <div className={s.erro}>Produto não encontrado.</div>;

    return (
        <div className={s.galeriaContainer}>
            {/* Breadcrumb */}
            <div className={s.breadcrumb}>
                <span>Home</span> &gt; <span>{produto.categoria_nome}</span> &gt; <span>{produto.nome}</span>
            </div>

            <div className={s.gridProduto}>
                {/* Galeria de Imagens */}
                <div className={s.galeriaImagens}>
                    <div className={s.imagemPrincipal} onClick={abrirModal}>
                        <img
                            src={imagemSelecionada}
                            alt={produto.nome}
                            loading="lazy"
                            className={s.imagemDestaque}
                        />
                        {produto.desconto && (
                            <span className={s.badgeDesconto}>-{produto.desconto}%</span>
                        )}
                    </div>
                    
                    {/* Miniaturas */}
                    <div className={s.miniaturas}>
                        {[produto.img_url, produto.img_url, produto.img_url].map((img, index) => (
                            <div 
                                key={index} 
                                className={`${s.miniatura} ${imagemSelecionada === img ? s.ativa : ''}`}
                                onClick={() => setImagemSelecionada(img)}
                            >
                                <img src={img} alt={`${produto.nome} - ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Informações do Produto */}
                <div className={s.infoProduto}>
                    <h1 className={s.tituloProduto}>{produto.nome}</h1>
                    <p className={s.laboratorio}>{produto.fabricante || 'Laboratório Genérico'}</p>
                    
                    <div className={s.avaliacao}>
                        <div className={s.estrelas}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < 4 ? s.cheia : s.vazia}>★</span>
                            ))}
                        </div>
                        <span className={s.numAvaliacoes}>({produto.avaliacoes || 42} avaliações)</span>
                    </div>
                    
                    <div className={s.precoContainer}>
                        {produto.desconto ? (
                            <>
                                <span className={s.precoOriginal}>R$ {produto.preco.toFixed(2)}</span>
                                <span className={s.precoComDesconto}>
                                    R$ {(produto.preco * (1 - produto.desconto/100)).toFixed(2)}
                                </span>
                                <span className={s.economia}>
                                    Economize R$ {(produto.preco * produto.desconto/100).toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className={s.precoNormal}>R$ {produto.preco.toFixed(2)}</span>
                        )}
                    </div>
                    
                    <div className={s.estoqueDisponibilidade}>
                        <div className={s.estoqueStatus}>
                            <span className={produto.estoque > 0 ? s.emEstoque : s.semEstoque}>
                                {produto.estoque > 0 ? 'Disponível' : 'Esgotado'}
                            </span>
                            <span>{produto.quantidade > 0 ? `(${produto.estoque} unidades)` : ''}</span>
                        </div>
                        <div className={s.entrega}>
                            <span className={s.iconeEntrega}>🚚</span>
                            <span>Entrega em 2-3 dias úteis</span>
                        </div>
                    </div>
                    
                    <div className={s.controleQuantidade}>
                        <h3>Quantidade:</h3>
                        <div className={s.quantidadeInput}>
                            <button disabled={quantidade <= 1}>
                                −
                            </button>
                            <span>{quantidade}</span>
                            <button disabled={quantidade >= produto.estoque}>
                                +
                            </button>
                        </div>
                        <span className={s.maximo}>Máximo: {produto.quantidade} unidades</span>
                    </div>
                    
                    <div className={s.botoesAcao}>
                        <button
                            className={s.botaoComprar}
                            onClick={() => adicionarProdutoCarrinho(produto, quantidade)}
                            disabled={produto.estoque <= 0}
                        >
                        </button>
                        <button 
                            className={`${s.botaoFavorito} ${favorito ? s.ativo : ''}`}
                            onClick={() => setFavorito(!favorito)}
                        >
                            {favorito ? 'Favoritado ✓' : 'Favoritar'}
                        </button>
                    </div>
                    
                    <div className={s.compartilhar}>
                        <span>Compartilhar:</span>
                        <button className={s.botaoCompartilhar}>
                            Compartilhar
                        </button>
                    </div>
                    
                    <div className={s.garantias}>
                        <div className={s.garantiaItem}>
                            <span className={s.iconeGarantia}>✓</span>
                            <span>Produto original</span>
                        </div>
                        <div className={s.garantiaItem}>
                            <span className={s.iconeGarantia}>🛡️</span>
                            <span>Qualidade garantida</span>
                        </div>
                        <div className={s.garantiaItem}>
                            <span className={s.iconeGarantia}>🌱</span>
                            <span>Entrega sustentável</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Detalhes do Produto */}
            <div className={s.detalhesProduto}>
                <div className={s.tabs}>
                    <button className={`${s.tab} ${s.ativo}`}>Descrição</button>
                    <button className={s.tab}>Informações Técnicas</button>
                    <button className={s.tab}>Modo de Usar</button>
                    <button className={s.tab}>Efeitos Colaterais</button>
                </div>
                
                <div className={s.conteudoTab}>
                    <h3>Sobre {produto.nome}</h3>
                    <p>{produto.descricao || 'Descrição detalhada não disponível.'}</p>
                    
                    <h3>Composição</h3>
                    <ul className={s.listaComposicao}>
                        <li>Princípio ativo: {produto.principioAtivo || 'Não especificado'}</li>
                        <li>Concentração: {produto.concentracao || 'Não especificada'}</li>
                        <li>Excipientes: {produto.excipientes || 'Não especificados'}</li>
                    </ul>
                    
                    <h3>Indicações</h3>
                    <p>{produto.indicacoes || 'Consulte um médico ou farmacêutico para informações sobre as indicações deste medicamento.'}</p>
                </div>
            </div>
            
            {/* Produtos Relacionados (simulado) */}
            <div className={s.produtosRelacionados}>
                <h2>Produtos Relacionados</h2>
                <div className={s.listaRelacionados}>
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className={s.cardRelacionado}>
                            <img src={produto.img_url} alt={`Produto relacionado ${item}`} />
                            <h4>{produto.nome} - {item}</h4>
                            <p>R$ {(produto.preco * (1 - 0.1*item)).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {modalAberto && (
                <div className={s.modal} onClick={fecharModal}>
                    <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                        <span className={s.modalFechar} onClick={fecharModal}>&times;</span>
                        <img
                            src={imagemSelecionada}
                            alt="Imagem em destaque"
                            className={s.modalImg}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GaleriaProduto;