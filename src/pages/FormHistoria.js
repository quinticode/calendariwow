import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enviarImagem } from "../services/uploadService";
import { publicarHistoria } from "../services/historiaService";

export default function FormHistoria() {
  const navigate = useNavigate();

  const [formDados, setFormDados] = useState({
    titulo: "",
    texto: "",
    genero: ""
  });

  const [imagemFile, setImagemFile] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormDados((dadosAnteriores) => ({
      ...dadosAnteriores,
      [name]: value
    }));
  }

  function handleFileChange(e) {
    const arquivo = e.target.files?.[0] || null;
    setImagemFile(arquivo);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const token = localStorage.getItem("token");
    let urlDaImagem = "";

    try {
      if (!token) {
        throw new Error("Você precisa estar logado para publicar uma história.");
      }

      if (!formDados.titulo.trim()) {
        throw new Error("O título é obrigatório.");
      }

      if (!formDados.genero.trim()) {
        throw new Error("O gênero é obrigatório.");
      }

      if (formDados.texto.trim().length < 30) {
        throw new Error(
          "Sua história está muito curta. Escreva pelo menos 30 caracteres."
        );
      }

      if (imagemFile) {
        const resultadoUpload = await enviarImagem(imagemFile, token);

        if (!resultadoUpload?.url) {
          throw new Error("Não foi possível enviar a imagem da capa.");
        }

        urlDaImagem = resultadoUpload.url;
      }

      await publicarHistoria(
        {
          ...formDados,
          imagem: urlDaImagem
        },
        token
      );

      navigate("/historias");
    } catch (error) {
      setErro(error.message || "Não foi possível publicar a história.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="form-page form-page--wide">
      <h1 className="page-title">Escrever nova história</h1>

      <form className="form-card form-card--wide" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="titulo">
              Título
            </label>

            <input
              className="form-input"
              type="text"
              id="titulo"
              name="titulo"
              value={formDados.titulo}
              onChange={handleChange}
              placeholder="Título da história"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="genero">
              Gênero
            </label>

            <input
              className="form-input"
              type="text"
              id="genero"
              name="genero"
              value={formDados.genero}
              onChange={handleChange}
              placeholder="Ex.: Terror, Romance, Fantasia"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="texto">
              História
            </label>

            <textarea
              className="form-input form-textarea"
              id="texto"
              name="texto"
              value={formDados.texto}
              onChange={handleChange}
              placeholder="Era uma vez..."
              rows={10}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="imagem">
              Capa da história{" "}
              <span className="form-optional">(opcional)</span>
            </label>

            <input
              className="form-file-input"
              type="file"
              id="imagem"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
            />

            {imagemFile && (
              <p className="form-file-name">
                Arquivo selecionado: {imagemFile.name}
              </p>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={carregando}
        >
          {carregando
            ? "Salvando imagem e publicando..."
            : "Publicar história"}
        </button>

        {erro && <p className="form-message msg-erro">{erro}</p>}
      </form>
    </section>
  );
}