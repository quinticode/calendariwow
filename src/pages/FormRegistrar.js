import { useState } from "react";
import TextoLegal from "../components/TextoLegal";
import { registrarUsuario } from "../services/registrarService";
import { Link } from "react-router-dom";

export default function FormRegistrar() {
  const dadosPadrao = {
    nome: "",
    email: "",
    senha: ""
  };

  const [formDados, setFormDados] = useState(dadosPadrao);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormDados((anterior) => ({
      ...anterior,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      await registrarUsuario(formDados);
      setEnviado(true);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function handleReset() {
    setFormDados(dadosPadrao);
    setEnviado(false);
    setErro("");
  }

  if (enviado) {
    return (
      <section className="form-card">
        <TextoLegal conteudo="Cadastro realizado!" tamanho="2rem" />

        <p className="form-message msg-sucesso">
          {formDados.nome}, seu e-mail {formDados.email} foi registrado com
          sucesso!
        </p>

        <Link className="btn btn-primary" to="/historias">
          Ver histórias!
        </Link>

        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleReset}
        >
          Fazer outro cadastro
        </button>
      </section>
    );
  }

  return (
    <section className="form-page">
      <TextoLegal conteudo="Cadastre-se!" tamanho="2rem" />

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="nome">
              Nome
            </label>

            <input
              className="form-input"
              type="text"
              id="nome"
              name="nome"
              value={formDados.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>

            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={formDados.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">
              Senha
            </label>

            <input
              className="form-input"
              type="password"
              id="senha"
              name="senha"
              value={formDados.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={carregando}
        >
          {carregando ? "Registrando..." : "Registrar"}
        </button>

        {erro && <p className="form-message msg-erro">{erro}</p>}
      </form>

      <p className="form-login-link">
        Já possui uma conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  );
}