import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function LerHistoria() {
    const { id } = useParams();
    const [historia, setHistoria] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/historias/${id}`)
            .then(resposta => resposta.json())
            .then(dados => setHistoria(dados))
            .catch(erro => console.log("Erro:", erro));
    }, [id]);

    if (!historia) return <div style={{ padding: "20px" }}>Carregando história...</div>;

    if (historia.erro) return <div style={{ padding: "20px" }}>História não encontrada.</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <Link to="/historias" style={{ textDecoration: "none", color: "#3498db", fontWeight: "bold" }}>
                ← Voltar para a Biblioteca
            </Link>

            <h1 style={{ marginTop: "20px", fontSize: "2.5rem" }}>{historia.titulo}</h1>
            <p style={{ color: "gray", marginBottom: "20px" }}>
                Escrito por: <strong>{historia.autor}</strong> | Gênero: {historia.genero}
            </p>
            
            {historia.imagem && (
                <img 
                    src={historia.imagem} 
                    alt="Capa da História" 
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "30px" }} 
                />
            )}
            
            {/*'pre-wrap' garante que as quebras de linha que o usuário digitou no texto sejam respeitadas! */}
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", fontSize: "1.1rem", color: "#333" }}>
                {historia.texto}
            </div>
        </div>
    );
}