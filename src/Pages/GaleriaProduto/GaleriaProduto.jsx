import { useState, useEffect } from 'react';
import './GaleriaProduto.css';

const GaleriaProduto = ({ imagens }) => {
    const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0]);
    const [modalAberto, setModalAberto] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // Pré-carrega as imagens
    useEffect(() => {
        const loadImages = async () => {
            const loadingPromises = imagens.map(img => {
                return new Promise((resolve) => {
                    const image = new Image();
                    image.src = img;
                    image.onload = resolve;
                });
            });
            
            await Promise.all(loadingPromises);
            setCarregando(false);
        };
        
        loadImages();
    }, [imagens]);

    const abrirModal = (imagem) => {
        setImagemSelecionada(imagem);
        setModalAberto(true);
        document.body.style.overflow = 'hidden'; // Desabilita scroll
    };

    const fecharModal = () => {
        setModalAberto(false);
        document.body.style.overflow = 'auto'; // Habilita scroll
    };

    // Fecha modal com ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') fecharModal();
        };

        if (modalAberto) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modalAberto]);

    if (carregando) {
        return (
            <div className="galeria-container">
                <div className="imagem-principal skeleton"></div>
                <div className="miniaturas">
                    {imagens.map((_, index) => (
                        <div key={index} className="miniatura skeleton"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="galeria-container">
            {/* Imagem Principal */}
            <div className="imagem-principal" onClick={() => abrirModal(imagemSelecionada)}>
                <img 
                    src={imagemSelecionada} 
                    alt="Imagem selecionada" 
                    loading="lazy"
                />
            </div>

            {/* Miniaturas */}
            <div className="miniaturas">
                {imagens.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Miniatura ${index + 1}`}
                        className={`miniatura ${img === imagemSelecionada ? 'selecionada' : ''}`}
                        onClick={() => setImagemSelecionada(img)}
                        loading="lazy"
                    />
                ))}
            </div>

            {/* Modal */}
            {modalAberto && (
                <div className="modal" onClick={fecharModal}>
                    <span className="modal-fechar" onClick={fecharModal}>&times;</span>
                    <img 
                        src={imagemSelecionada} 
                        alt="Imagem em destaque" 
                        className="modal-img" 
                    />
                </div>
            )}
        </div>
    );
};

export default GaleriaProduto;