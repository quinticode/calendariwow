import { Link } from "react-router-dom";
import TextoLegal from "../components/TextoLegal";
import { Saudacao } from "./SalaDeEstar"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {console.log("o componente foi montado na tela!")},[])

  return (
    <main className="home">
      <section className="home__content">
        <h1 className="home__title">Historiólas ;)</h1>
        <h2 className="home__subtitle">Compartilhe e leia histórias!</h2>

        <p className="home__description">
          Salve suas histórias, publique suas ideias, veja textos criados por outras pessoas!!!!
        </p>

        <div className="home__actions">
          <Link className="btn btn-primary" to="/registrar">
            Criar conta
          </Link>

          <Link className="btn btn-outline" to="/login">
            Entrar na conta
          </Link>

        </div>
      </section>
    </main>
  );
}