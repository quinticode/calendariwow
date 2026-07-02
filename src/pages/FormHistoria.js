import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enviarImagem } from "../services/uploadService"; 
import { publicarHistoria } from "../services/historiaService";

export default function FormHistoria() {
    const navigate = useNavigate();

    const [formDados, setFormDados] = useState({
        autor: "",
        titulo: "",
        texto: "",
        imagem: "",
        genero: ""
    });

    const [imagemFile, setImagemFile] = useState(null); 
    const [carregando, setCarregando] = useState(false); 

    function handleChange(e) {
        setFormDados({ ...formDados, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        if (e.target.files && e.target.files.length > 0) {
            setImagemFile(e.target.files[0]);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setCarregando(true); 

        let urlDaImagem = "";

        try {

            if (imagemFile) {
                const token = localStorage.getItem("token"); 
                const resultadoUpload = await enviarImagem(imagemFile, token);

                if (resultadoUpload && resultadoUpload.url) {
                    urlDaImagem = resultadoUpload.url; 
                } else {
                    throw new Error("Erro ao fazer o upload da imagem da capa.");
                }
            }

            const dadosParaEnviar = {
                ...formDados,
                imagem: urlDaImagem
            };


            await publicarHistoria(dadosParaEnviar);

            alert("História publicada com sucesso!");
            navigate("/historias"); 

        } catch (error) {

            alert(error.message); 
        } finally {
            setCarregando(false); 
        }
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Escrever Nova História</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input name="titulo" placeholder="Título da História" onChange={handleChange} required />
                <input name="autor" placeholder="Nome do Autor" onChange={handleChange} required />
                <input name="genero" placeholder="Gênero (ex: Terror, Romance)" onChange={handleChange} required />
                
                <textarea 
                    name="texto" 
                    placeholder="Era uma vez..." 
                    rows="8" 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", fontFamily: "inherit", resize: "vertical" }}
                />
                
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontSize: "0.9rem", color: "#555", fontWeight: "600" }}>
                        Capa da História (Opcional)
                    </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        style={{ padding: "10px", border: "1px solid #e2e8f0", borderRadius: "6px", backgroundColor: "#f8fafc" }}
                    />
                </div>
                
                <button type="submit" disabled={carregando}>
                    {carregando ? "Salvando imagem e publicando..." : "Publicar História"}
                </button>
            </form>
        </div>
    );
}