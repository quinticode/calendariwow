import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function LerHistoria() {
  const { id } = useParams();

  const [historia, setHistoria] = useState(null);
  const [textoTraduzido, setTextoTraduzido] = useState("");
  const [mostrarIngles, setMostrarIngles] = useState(false);
  const [traduzindo, setTraduzindo] = useState(false);

  useEffect(() => {
    async function buscarHistoria() {
      try {
        const resposta = await fetch(
          `http://localhost:3001/historias/${id}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.erro || "História não encontrada.");
        }

        setHistoria(dados);
      } catch (erro) {
        console.log(erro);
        setHistoria({
          erro: "Não foi possível carregar a história."
        });
      }
    }

    buscarHistoria();
  }, [id]);

  async function alternarIdioma() {
    if (!mostrarIngles && textoTraduzido) {
      setMostrarIngles(true);
      return;
    }

    if (mostrarIngles) {
      setMostrarIngles(false);
      return;
    }

    setTraduzindo(true);

    try {
      const url =
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          historia.texto
        )}&langpair=pt|en`;

      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (dados.responseData?.translatedText) {
        setTextoTraduzido(dados.responseData.translatedText);
        setMostrarIngles(true);
      } else {
        alert("A API não conseguiu traduzir este texto.");
      }
    } catch (erro) {
      console.log(erro);
      alert("Erro ao conectar com a API de tradução.");
    } finally {
      setTraduzindo(false);
    }
  }

  if (!historia) {
    return <p className="page-status">Carregando história...</p>;
  }

  if (historia.erro) {
    return <p className="form-message msg-erro">{historia.erro}</p>;
  }

  return (
    <article className="reading-page">
      <Link className="back-link" to="/historias">
        ← Voltar para a biblioteca
      </Link>

      <header className="reading-header">
        <div>
          <h1 className="reading-title">{historia.titulo}</h1>

          <p className="reading-meta">
            Escrito por: <strong>{historia.autor}</strong>
            <span>•</span>
            Gênero: {historia.genero}
          </p>
        </div>

        <button
          className={`btn btn-auto ${
            mostrarIngles ? "btn-danger" : "btn-success"
          }`}
          type="button"
          onClick={alternarIdioma}
          disabled={traduzindo}
        >
          {traduzindo
            ? "Traduzindo..."
            : mostrarIngles
              ? "Ler original (PT)"
              : "Read in English"}
        </button>
      </header>

      {historia.imagem && (
        <img
          className="reading-cover"
          src={historia.imagem}
          alt={`Capa de ${historia.titulo}`}
        />
      )}

      <div className="reading-text">
        {mostrarIngles ? textoTraduzido : historia.texto}
      </div>
    </article>
  );
}