import { useState } from 'react';
import s from './pedidos.module.scss';

export default function Pedidos() {

  const [mockPedidos, setMockPedidos] = useState([])

  return (
    <section className={s.pedidos}>
      <div className={s.container}>
        <h2 className={s.titulo}>Acompanhe seus pedidos</h2>

        {mockPedidos.length === 0 ? (
          <div className={s.semPedidos}>
            <svg className={s.icone} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <p>Você ainda não fez nenhum pedido.</p>
            <button className={s.botaoPrimario}>Explorar produtos</button>
          </div>
        ) : (
          <div className={s.listaPedidos}>
            {mockPedidos.map((pedido) => (
              <div key={pedido.id} className={s.pedidoCard}>
                <div className={s.pedidoCabecalho}>
                  <div>
                    <h3 className={s.pedidoNumero}>Pedido #{pedido.id}</h3>
                    <p className={s.pedidoData}>{pedido.data}</p>
                  </div>
                  <span className={`${s.pedidoStatus} ${s[pedido.status.toLowerCase()]}`}>
                    {pedido.status}
                  </span>
                </div>

                <div className={s.pedidoItens}>
                  {pedido.itens.slice(0, 3).map((item, index) => (
                    <div key={index} className={s.pedidoItem}>
                      <span className={s.itemQuantidade}>{item.quantidade}x</span>
                      <span className={s.itemNome}>{item.nome}</span>
                      <span className={s.itemPreco}>R${item.preco.toFixed(2)}</span>
                    </div>
                  ))}
                  {pedido.itens.length > 3 && (
                    <div className={s.pedidoMaisItens}>
                      +{pedido.itens.length - 3} itens
                    </div>
                  )}
                </div>

                <div className={s.pedidoRodape}>
                  <div className={s.pedidoTotal}>
                    <span>Total:</span>
                    <strong>R${pedido.total.toFixed(2)}</strong>
                  </div>
                  <div className={s.pedidoAcoes}>
                    <button className={s.botaoSecundario}>
                      Ver detalhes
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                    {pedido.status === 'Entregue' && (
                      <button className={s.botaoTerciario}>
                        Avaliar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}