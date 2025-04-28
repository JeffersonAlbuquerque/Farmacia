import React from 'react';
import s from './categoriasNav.module.scss';

const CategoriasNav = ({ categorias }) => {
    return (
        <nav className={s.categoriasNav}>
            <ul>
                {categorias.map((categoria) => (
                    <li key={categoria.id}>
                        <a href={`#${categoria.id}`} className={s.categoriaLink}>
                            {categoria.nome}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>


    )
}

export default CategoriasNav;
