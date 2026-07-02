import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  async function fazerLogin(e) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        localStorage.removeItem("token");
        setErro(dados.erro || "Não foi possível fazer login.");
        return;
      }

      localStorage.setItem("token", dados.token);
      navigate("/historias");
    } catch (erro) {
      setErro("Não foi possível conectar ao servidor.");
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="form-page">
      <h1 className="page-title">Entrar</h1>

      <form className="form-card" onSubmit={fazerLogin}>
        <div className="form-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              E-mail
            </label>

            <input
              className="form-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={carregando}
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        {erro && <p className="form-message msg-erro">{erro}</p>}
      </form>

      <p className="form-login-link">
        Ainda não possui uma conta? <Link to="/registrar">Cadastre-se</Link>
      </p>
    </section>
  );
}