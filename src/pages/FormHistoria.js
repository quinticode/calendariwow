import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormHistoria() {
    const navigate = useNavigate();

    const [formDados, setFormDados] = useState({
        autor: "",
        titulo: "",
        texto: "",
        imagem: "",
        genero: ""
    });

    function handleChange(e) {
        setFormDados({ ...formDados, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resposta = await fetch("http://localhost:3001/historias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDados)
            });

            if (resposta.ok) {
                alert("História publicada com sucesso!");
                navigate("/historias"); 
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
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
                    style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                
                {/* CONECTAR UPLOAD AQUI DEPOIS */}
                <input name="imagem" placeholder="Link de uma Imagem de Capa (Opcional)" onChange={handleChange} />
                
                <button type="submit">Publicar História</button>
            </form>
        </div>
    );
}