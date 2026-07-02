import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HistoriasPage() {
    const [historias, setHistorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/historias")
            .then(resposta => resposta.json())
            .then(dados => setHistorias(dados))
            .catch(erro => console.log("Erro ao buscar:", erro));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Biblioteca de Histórias</h2>
                <Link to="/FormHistoria">
                    <button style={{ width: "auto" }}>+ Criar História</button>
                </Link>
            </div>

            {/* Grid para exibir o preview das histórias */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                {historias.length === 0 ? (
                    <p>Nenhuma história publicada ainda. Seja o primeiro!</p>
                ) : (
                    historias.map(historia => (
                        <div key={historia.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", width: "250px", backgroundColor: "#fff" }}>
                            {historia.imagem && (
                                <img src={historia.imagem} alt="Capa" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }} />
                            )}
                            <h3 style={{ marginTop: "10px", marginBottom: "5px" }}>{historia.titulo}</h3>
                            <p style={{ fontSize: "0.8rem", color: "gray", marginBottom: "10px" }}>Por: {historia.autor}</p>
                            <p style={{ fontSize: "0.9rem" }}>Gênero: {historia.genero}</p>
                            
                            <button style={{ marginTop: "15px", backgroundColor: "#2c3e50" }}>Ler História</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}