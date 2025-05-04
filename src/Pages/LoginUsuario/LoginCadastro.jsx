import { useState } from 'react';
import { useNavigate, BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import s from './login.module.scss';
import axios from 'axios';

export default function LoginCadastro() {

    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [nascimento, setNascimento] = useState("")
    const [cep, setCep] = useState("")
    const [endereco, setEndereco] = useState("")
    const [email, setEmail] = useState("")
    const [celular, setCelular] = useState("")
    const [telefone, setTelefone] = useState("")
    const [senha, setSenha] = useState("")

    const capturaNome = (e) => setNome(e.target.value);
    const capturaCpf = (e) => setCpf(e.target.value);
    const capturaNascimento = (e) => setNascimento(e.target.value);
    const capturaCep = (e) => setCep(e.target.value);
    const capturaEndereco = (e) => setEndereco(e.target.value);
    const capturaEmail = (e) => setEmail(e.target.value);
    const capturaCelular = (e) => setCelular(e.target.value);
    const capturaTelefone = (e) => setTelefone(e.target.value);
    const capturaSenha = (e) => setSenha(e.target.value);


    const [emailCadastrado, setEmailCadastrado] = useState("")
    const [senhaCadastrada, setSenhaCadastrada] = useState("")
    const [erro, setErro] = useState("")

    const capturarEmailCadastrado = (e) => setEmailCadastrado(e.target.value);
    const capturarSenhaCadastrada = (e) => setSenhaCadastrada(e.target.value);

    const [loading, setLoading] = useState(false);
    const [logado, setLogado] = useState(false)

    const navigate = useNavigate(); //Inicializando o hook useNavigate






    const criarUsuario = async () => {
        setLoading(true);
        setErro(""); // Limpa mensagens anteriores
        if (!nome || !cpf || !nascimento || !email || !telefone || !senha) {
            setErro("Erro, preencha todos os campos!");
            setLoading(false);
            return;
        }
        try {
            const dadosParaEnviar = { nome, cpf, nascimento, email, celular, telefone, cep, endereco, senha };
            await axios.post("https://bancodadosfarmacia.onrender.com/cadastro", dadosParaEnviar);
            setErro("✅ Cadastro efetuado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar usuário", error);
            setErro("Erro ao criar usuário. Verifique os dados.");
        } finally {
            setLoading(false);
        }
    }


    const loginUsuario = async () => {
        setLoading(true);
        setErro("");
        if (!emailCadastrado || !senhaCadastrada) {
            setErro("Preencha e-mail e senha.");
            setLoading(false);
            return;
        }
        try {
            const dadosParaEnviar = { email: emailCadastrado, senha: senhaCadastrada };
            const resposta = await axios.post("https://bancodadosfarmacia.onrender.com/login", dadosParaEnviar);

            if (resposta.data.sucesso) {
                alert("Login bem-sucedido");
                localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));
                navigate('/');
            } else {
                setErro("Usuário ou senha inválidos.");
            }
        } catch (err) {
            console.error("Erro ao realizar login", err);
            setErro("Erro ao realizar login. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            {loading && (
                <div className={s.loadingOverlay}>
                    <div className={s.spinner}></div>
                    <p>Carregando...</p>
                </div>
            )}

            <main className={s.Main}>
                <section className={s.forms}>
                    <form className={s.formLogin} onSubmit={(e) => e.preventDefault()}>
                        <h1>Login</h1>
                        <p>Já tem uma conta? Informe seus dados para acessar.</p>

                        <div className={s.campoInput}>
                            <input className={s.input} type="email" placeholder="E-mail" onChange={capturarEmailCadastrado} required />
                            <input className={s.input} type="password" placeholder="Senha" onChange={capturarSenhaCadastrada} required />
                        </div>

                        <div className={s.entrar}>
                            <button type="button" onClick={loginUsuario}>Entrar</button>
                            <a href="#">Esqueci Minha Senha</a>
                        </div>

                        <div className={s.trocarSenha}>
                            <input className={s.input} type="email" placeholder="E-mail" required />
                            <button type="button">Enviar</button>
                        </div>
                    </form>

                    {/* Cadastro */}
                    <form className={s.FormCadastro}>

                        <div className={s.containerCadastro}>
                            <div className={s.containerTitulo}>
                                <h1>Cadastro</h1>
                                <p>
                                    Ainda não tem uma conta? Crie uma agora mesmo e tenha acesso aos benefícios exclusivos
                                </p>
                            </div>
                            <div className={s.containerGrande}>
                                <legend>Dados Pessoais</legend>
                                <input className={s.inputG} type="text" placeholder="Nome Completo" onChange={capturaNome} required />
                            </div>

                            <div className={s.containerPequeno}>
                                <input
                                    className={s.inputP}
                                    placeholder="CPF/CNPJ" onChange={capturaCpf}
                                    required
                                />
                                <input className={s.inputP} type="date" placeholder="Data Nascimento" onChange={capturaNascimento} required />
                            </div>

                            <div className={s.containerPequeno}>
                                <input className={s.inputP} type="text" placeholder="CEP" onChange={capturaCep} required />
                                <input className={s.inputP} type="text" placeholder="Endereço" onChange={capturaEndereco} required />
                            </div>

                            <div className={s.containerGrande}>
                                <input className={s.inputG} type="email" placeholder="E-mail" onChange={capturaEmail} required />
                            </div>

                            <div className={s.containerPequeno}>
                                <input className={s.inputP} type="text" placeholder="Celular" onChange={capturaCelular} required />
                                <input className={s.inputP} type="text" placeholder="Telefone (Opcional)" onChange={capturaTelefone} />
                            </div>

                            <div className={s.containerGrande}>
                                <legend>Senha</legend>
                                <input className={s.inputG} type="password" placeholder="Senha" onChange={capturaSenha} required />
                            </div>

                            <div className={s.containerCheckBox}>
                                <legend>Termos</legend>
                                <div className={s.checkbox}>
                                    <input className={s.inputCheck} type="checkbox" />
                                    <span>Li e aceito os <a href="">termos de uso de privacidade</a>(obrigatório)</span>
                                </div>
                                <div className={s.checkbox}>
                                    <input className={s.inputCheck} type="checkbox" />
                                    <span>Li e aceito os <a href="">termos de uso </a>(obrigatório)</span>
                                </div>
                            </div>

                            <div className={s.cadastrarBtn}>
                                <button type="button" onClick={criarUsuario}>Cadastrar</button>

                                {erro && <p>{erro}</p>}

                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}
