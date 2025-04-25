import React from 'react';
import s from '../../Pages/Inicio/inicio.module.scss';

const CategoriasNav = ({ categoriasMenu }) => {
    return (
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
    );
};

export default CategoriasNav;
