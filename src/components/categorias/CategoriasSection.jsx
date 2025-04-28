import React from 'react';
import s from './categoriasNav.module.scss';

const CategoriasSection = ({ categorias }) => {
    return (
        <section className={s.categoriasSection}>
            <h2 className={s.sectionTitle}>Navegue por Categorias</h2>
            <div className={s.categoriasGrid}>
                {categorias.map((categoria) => (
                    <a
                        href={`#${categoria.id}`}
                        key={categoria.id}
                        className={s.categoriaCard}
                    >
                        <h3>{categoria.nome}</h3>
                        <span>Ver produtos</span>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default CategoriasSection
