import React from "react";
import s from "./infoUsuario.module.scss";

export default function Perfil() {
    return (
        <div className={s.container}>
            {/* Sidebar */}
            <aside className={s.sidebar}>
                <div className={s.sidebarHeader}>
                    <h1 className={s.titulo}>Jefferson!</h1>
                </div>
                <nav className={s.nav}>
                    <div className={s.navItemAtivo}>👤 Meus dados</div>
                    <div className={s.navItem}>🏠 Endereço</div>
                    <div className={s.navItem}>🚚 Pedidos</div>
                    <div className={s.navItem}>⚙️ Configurações</div>
                    <div className={s.navItem}>💳 Cartões</div>
                    <div className={s.navItem}>↩️ Sair</div>
                </nav>
            </aside>

            {/* Conteúdo */}
            <main className={s.main}>
                <h2 className={s.subtitulo}>Meus dados</h2>

                <div className={s.grid}>
                    <div>
                        <label className={s.label}>Nome</label>
                        <input
                            type="text"
                            disabled
                            value="Jefferson"
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>Sobrenome</label>
                        <input
                            type="text"
                            disabled
                            value="Albuquerque"
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>Email</label>
                        <input
                            type="email"
                            disabled
                            value="jadriao3@gmail.com"
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>Gênero</label>
                        <input
                            type="text"
                            disabled
                            value=""
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>CPF</label>
                        <input
                            type="text"
                            disabled
                            value="06741403116"
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>Telefone</label>
                        <input
                            type="text"
                            disabled
                            value="(85) 99209-4806"
                            className={s.input}
                        />
                    </div>

                    <div>
                        <label className={s.label}>Data de nascimento</label>
                        <input
                            type="text"
                            disabled
                            value="21/09/2004"
                            className={s.input}
                        />
                    </div>
                </div>

                <div className={s.buttonContainer}>
                    <button className={s.botaoEditar}>
                        EDITAR
                    </button>
                </div>
            </main>
        </div>
    );
}
