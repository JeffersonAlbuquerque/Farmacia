// Importa o Link do react-router-dom para navegação interna entre páginas
import { Link } from "react-router-dom";

// Importa os estilos do módulo SCSS específico do Header
import s from './header.module.scss';

// Importa imagens que serão usadas no cabeçalho
import logoW from '../../assets/logoRaiaWebSite.png';
import lupa from '../../assets/lupa.png';
import usuario from '../../assets/usuario.png';
import pedidos from '../../assets/pedidos.png';
import carrinhoIcon from '../../assets/carrinhoCompras.png';

// Componente Header recebe a função toggleCarrinho via props
export default function Header({ toggleCarrinho }) {
    return (
        // Container principal do cabeçalho
        <header className={s.header}>
            <section className={s.headerFilho}>
                {/* Logo da empresa com link para a página inicial */}
                <Link className={s.link} to='/'>
                    <img className={s.logo} src={logoW} alt="logo-site" />
                </Link>

                {/* Barra de busca com campo de input e ícone de lupa */}
                <section className={s.barraDeBusca}>
                    <input type="search" placeholder="O que você está buscando?" required />
                    <img src={lupa} alt="Buscar" />
                </section>

                {/* Menu de navegação do usuário */}
                <nav>
                    <ul>
                        {/* Link para login ou cadastro */}
                        <li>
                            <Link className={s.link} to='/login'>
                                <img src={usuario} alt="Login" />
                                <div>
                                    <span>Entrar</span>
                                    <span>ou Cadastrar</span>
                                </div>
                            </Link>
                        </li>

                        {/* Link para acompanhar os pedidos */}
                        <li>
                            <Link className={s.link} to='/pedidos'>
                                <img src={pedidos} alt="Pedidos" />
                                <div>
                                    <span>Acompanhar</span>
                                    <span>Pedidos</span>
                                </div>
                            </Link>
                        </li>

                        {/* Botão para abrir o modal do carrinho - chama a função toggleCarrinho */}
                        <li>
                            {/* Substituímos o Link por um botão porque não é uma navegação de rota */}
                            <button className={`${s.link} ${s.btnCarrinho}`} onClick={toggleCarrinho}>
                                <img src={carrinhoIcon} alt="Carrinho" />
                                <div>
                                    <span>Seu</span>
                                    <span>Carrinho</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    );
}
