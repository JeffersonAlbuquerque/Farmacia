import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import s from './header.module.scss'
import LoginU from '../../Pages/LoginUsuario/LoginCadastro';
import Inicio from '../../Pages/Inicio/Inicio.jsx'
import CarrinhoCompras from '../../components/carrinhoCompras/Carrinho.jsx'
import PagePedidos from '../../components/acompanharPedidos/Pedidos.jsx'

//images 

import logoW from '../../assets/logoRaiaWebSite.png'
import lupa from '../../assets/lupa.png'
import usuario from '../../assets/usuario.png'
import pedidos from '../../assets/pedidos.png'
import carrinho from '../../assets/carrinhoCompras.png'



export default function Header() {

    return (
        <BrowserRouter>
            <header className={s.header}>
                <section className={s.headerFilho}>
                    <Link className={s.link} to='/'><img className={s.logo} src={logoW} alt="logo-site" /></Link>

                    <section className={s.barraDeBusca}>
                        <input type="search" name="" id="" placeholder="O que você está buscando?" required />
                        <img src={lupa} alt="" />
                    </section>
                    <nav>
                        <ul>
                            <li>
                                <Link className={s.link} to='/login'>
                                    <img src={usuario} alt="pedidos" />
                                    <div>
                                        <span>Acompanhar</span>
                                        <span>Pedidos</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className={s.link} to='/pedidos'>
                                    <img src={pedidos} alt="pedidos" />
                                    <div>
                                        <span>Acompanhar</span>
                                        <span>Pedidos</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className={s.link} to='/carrinhoCompras'>
                                    <img src={carrinho} alt="pedidos" />
                                    <div>
                                        <span>Acompanhar</span>
                                        <span>Pedidos</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/login' element={<LoginU />} />
                <Route path='/pedidos' element={<PagePedidos />} />
                <Route path='/carrinhoCompras' element={<CarrinhoCompras/>} />
            </Routes>
        </BrowserRouter>
    )
}