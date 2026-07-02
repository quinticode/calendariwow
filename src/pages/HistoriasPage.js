import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoriasPage() {
  const [historias, setHistorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarHistorias() {
      try {
        const resposta = await fetch("http://localhost:3001/historias");
        const dados = await resposta.json();

        if (!resposta.ok || !Array.isArray(dados)) {
          throw new Error(dados.erro || "Não foi possível carregar as histórias.");
        }

        setHistorias(dados);
      } catch (erro) {
        console.log(erro);
        setErro("Não foi possível carregar as histórias.");
      } finally {
        setCarregando(false);
      }
    }

    buscarHistorias();
  }, []);

  return (
    <section className="stories-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Biblioteca de Histórias</h1>
          <p className="page-description">
            Explore histórias criadas pela galera
          </p>
        </div>

        <Link className="btn btn-primary btn-auto" to="/FormHistoria">
          + Criar história
        </Link>
      </header>

      {carregando && <p className="page-status">Carregando histórias...</p>}

      {erro && <p className="form-message msg-erro">{erro}</p>}

      {!carregando && !erro && historias.length === 0 && (
        <p className="page-status">
          Nenhuma história publicada ainda. Seja o primeiro!
        </p>
      )}

      {!carregando && !erro && historias.length > 0 && (
        <div className="stories-grid">
          {historias.map((historia) => (
            <article className="story-card" key={historia.id}>
              {historia.imagem ? (
                <img
                  className="story-card__image"
                  src={historia.imagem}
                  alt={`Capa de ${historia.titulo}`}
                />
              ) : (
                <div className="story-card__image story-card__image--empty">
                  Sem capa
                </div>
              )}

              <div className="story-card__content">
                <h2 className="story-card__title">{historia.titulo}</h2>

                <p className="story-card__author">
                  Por: {historia.autor}
                </p>

                <p className="story-card__genre">
                  Gênero: {historia.genero}
                </p>

                <Link
                  className="btn btn-dark story-card__button"
                  to={`/historia/${historia.id}`}
                >
                  Ler história
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}