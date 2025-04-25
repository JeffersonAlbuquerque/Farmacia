import { useState } from "react";
import s from "./carrinho.module.scss";



export default function Carrinho({ carrinho, setCarrinho, isOpen, toggleCarrinho }) {
    const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

    return (
        <div className={`${s.carrinhoOverlay} ${isOpen ? s.open : ''}`}>
            <div className={s.carrinhoContainer}>
                {/* Cabeçalho */}
                <div className={s.carrinhoHeader}>
                    <div className={s.headerContent}>
                        <h2>
                            <svg className={s.cartIcon} viewBox="0 0 24 24">
                                <path d="M17 18a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM7 18a2 2 0 1 1-2-2 2 2 0 0 1 2 2zM15 8h4l-2.6 7.6a2 2 0 0 1-2 1.4H8.1a2 2 0 0 1-2-1.4L3 4H2" />
                            </svg>
                            Seu Carrinho
                        </h2>
                        <button className={s.closeButton} onClick={toggleCarrinho}>
                            <svg viewBox="0 0 24 24">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className={s.itensCount}>{carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}</div>
                </div>

                {/* Corpo do carrinho */}
                <div className={s.carrinhoBody}>
                    {carrinho.length === 0 ? (
                        <div className={s.carrinhoVazio}>
                            <svg className={s.emptyCartIcon} viewBox="0 0 24 24">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            <h3>Seu carrinho está vazio</h3>
                            <p>Adicione produtos para continuar</p>
                            <button className={s.continueButton}>Continuar comprando</button>
                        </div>
                    ) : (
                        <>
                            <div className={s.produtosLista}>
                                {carrinho.map((item) => (
                                    <div className={s.produtoItem} key={item.id}>
                                        <img src={item.img_url} alt={item.nome} className={s.produtoImagem} />
                                        <div className={s.produtoInfo}>
                                            <div className={s.produtoHeader}>
                                                <h3 className={s.produtoNome}>{item.nome}</h3>
                                                <button className={s.removeButton}>
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M18 6L6 18M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <span className={s.produtoCategoria}>{item.categoria}</span>
                                            <div className={s.produtoControles}>
                                                <div className={s.quantidadeControl}>
                                                    <button className={s.quantidadeButton}>-</button>
                                                    <span className={s.quantidadeValue}>{item.quantidade}</span>
                                                    <button className={s.quantidadeButton}>+</button>
                                                </div>
                                                <span className={s.produtoPreco}>
                                                    R${(item.qtd * item.preco).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cupom de desconto */}
                            <div className={s.cupomContainer}>
                                <input
                                    type="text"
                                    placeholder="Código de cupom"
                                    className={s.cupomInput}
                                />
                                <button className={s.cupomButton}>Aplicar</button>
                            </div>

                            {/* Resumo do pedido */}
                            <div className={s.resumoPedido}>
                                <div className={s.resumoLinha}>
                                    <span>Subtotal</span>
                                    <span>R${total.toFixed(2)}</span>
                                </div>
                                <div className={s.resumoLinha}>
                                    <span>Frete</span>
                                    <span className={s.freteGratis}>Grátis</span>
                                </div>
                                <div className={s.resumoLinha}>
                                    <span>Desconto</span>
                                    <span>- R$0,00</span>
                                </div>
                                <div className={`${s.resumoLinha} ${s.resumoTotal}`}>
                                    <strong>Total</strong>
                                    <strong>R${total.toFixed(2)}</strong>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Rodapé (apenas quando tem itens) */}
                {carrinho.length > 0 && (
                    <div className={s.carrinhoFooter}>
                        <button className={s.finalizarButton}>
                            Finalizar Compra
                            <svg className={s.arrowIcon} viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div className={s.paymentMethods}>
                            <img src="#" alt="Visa" />
                            <img src="#" alt="Mastercard" />
                            <img src="#" alt="Amex" />
                            <img src="#" alt="Pix" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
