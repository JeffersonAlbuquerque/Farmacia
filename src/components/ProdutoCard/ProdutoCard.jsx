// ProdutoCard.jsx
import React, { useState } from 'react';
import s from '../../Pages/Inicio/inicio.module.scss';

const ProdutoCard = ({ produto, onAddToCart }) => {
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
};

export default ProdutoCard;
