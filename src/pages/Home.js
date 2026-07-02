import { Link } from "react-router-dom";
import TextoLegal from "../components/TextoLegal";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <TextoLegal tamanho="clamp(3.5rem, 12vw, 9rem)" conteudo="Historiólas ;)" />

        <TextoLegal
          tamanho="clamp(1.4rem, 4vw, 3rem)"
          conteudo="Compartilhe e leia histórias!"
        />

        <p className="home-description">
          Salve suas histórias, publique suas ideias, veja textos criados
          por outras pessoas!!!!
        </p>

        <div className="home-actions">
          <Link className="btn btn-primary home-button" to="/registrar">
            Criar conta
          </Link>

          <Link className="btn btn-outline home-button" to="/login">
            Entrar na conta
          </Link>
        </div>
      </div>
    </section>
  );
}