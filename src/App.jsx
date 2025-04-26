import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Inicio from './Pages/Inicio/Inicio.jsx';
import CarrinhoC from './components/carrinhoCompras/Carrinho.jsx';
import LoginU from './Pages/LoginUsuario/LoginCadastro.jsx';
import PagePedidos from './components/acompanharPedidos/Pedidos.jsx';
import GaleriaProduto from './Pages/GaleriaProduto/GaleriaProduto.jsx'

import './GlobalStyle/globalStyle.scss';

export default function App() {
  // Estado do carrinho (produtos)
  const [carrinho, setCarrinho] = useState([]);

  // Estado que controla se o modal do carrinho está visível
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  // Função para alternar a visibilidade do carrinho
  const toggleCarrinho = () => {
    setCarrinhoAberto(prev => !prev);
  };

  return (
    <Router>
      {/* Cabeçalho visível em todas as rotas */}
      <Header toggleCarrinho={toggleCarrinho} />

      {/* Corpo da aplicação com rotas */}
      <Routes>
        <Route path="/" element={<Inicio carrinho={carrinho} setCarrinho={setCarrinho} />} />
        <Route path="/login" element={<LoginU />} />
        <Route path="/pedidos" element={<PagePedidos />} />
        <Route
  path="/produto/:id"
  element={<GaleriaProduto adicionarProdutoCarrinho={(idProduto, quantidade) => {
    const produtoExistente = carrinho.find(item => item.id === idProduto);

    if (produtoExistente) {
      setCarrinho(prevCarrinho =>
        prevCarrinho.map(item =>
          item.id === idProduto
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        )
      );
    } else {
      setCarrinho(prevCarrinho => [
        ...prevCarrinho,
        { id: idProduto, quantidade }
      ]);
    }
  }} />}
/>
        {/* Removido o carrinho como rota, pois ele será um modal global */}
      </Routes>

      {/* Carrinho como modal global, visível em qualquer rota */}
      {carrinhoAberto && (
        <CarrinhoC
          carrinho={carrinho}
          setCarrinho={setCarrinho}
          isOpen={carrinhoAberto} // <== adiciona isso
          toggleCarrinho={toggleCarrinho} // <== e isso também
        />
      )}


      {/* Rodapé visível em todas as rotas */}
      <Footer />
    </Router>
  );
}
