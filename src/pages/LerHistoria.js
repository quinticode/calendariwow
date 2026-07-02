import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function LerHistoria() {
    const { id } = useParams();
    const [historia, setHistoria] = useState(null);

    const [textoTraduzido, setTextoTraduzido] = useState("");
    const [mostrarIngles, setMostrarIngles] = useState(false);
    const [traduzindo, setTraduzindo] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/historias/${id}`)
            .then(resposta => resposta.json())
            .then(dados => setHistoria(dados))
            .catch(erro => {
                console.log("Erro:", erro);
                setHistoria({ erro: "Não foi possível carregar a história." });
            });
    }, [id]);

    // chama a api do MyMemory
    async function alternarIdioma() {

        // se o usuario quer ver em ingles, mas ja temos a traducao, só troca a tela 
        if (!mostrarIngles && textoTraduzido) {
            setMostrarIngles(true);
            return;
        }

        // mesma coisa mas em ptbr
        if (mostrarIngles) {
            setMostrarIngles(false);
            return;
        }

        // se ainda nao tem ingles, ele seta traduzindo pra true e vai buscar na api
        setTraduzindo(true); // ativa o carregando do botao
        
        try {
            // Acessa a API pública enviando o texto da história (pt) para inglês (en)
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(historia.texto)}&langpair=pt|en`;
            
            const resposta = await fetch(url);
            const dados = await resposta.json();
            
            // Se a API devolveu com sucesso:
            if (dados.responseData && dados.responseData.translatedText) {
                setTextoTraduzido(dados.responseData.translatedText); // Salva na memória
                setMostrarIngles(true); // Vira a chave para mostrar o texto novo
            } else {
                alert("A API não conseguiu traduzir este texto.");
            }
        } catch (erro) {
            alert("Erro ao conectar com a API de tradução.");
        } finally {
            setTraduzindo(false); 
        }
    }

    if (!historia) return <div style={{ padding: "20px" }}>Carregando história...</div>;
    if (historia.erro) return <div style={{ padding: "20px" }}>História não encontrada.</div>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <Link to="/historias" style={{ textDecoration: "none", color: "#3498db", fontWeight: "bold" }}>
                ← Voltar para a Biblioteca
            </Link>

            {/* Cabeçalho com o Título e o Botão da API */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h1 style={{ fontSize: "2.5rem", margin: 0 }}>{historia.titulo}</h1>
                
                <button 
                    onClick={alternarIdioma} 
                    disabled={traduzindo}
                    style={{ 
                        padding: "8px 16px", 
                        backgroundColor: mostrarIngles ? "#e74c3c" : "#2ecc71", // Vermelho ou Verde
                        width: "auto",
                        boxShadow: "none"
                    }}
                >
                    {traduzindo ? "⏳ Traduzindo..." : (mostrarIngles ? "Ler Original (PT)" : "🌎 Read in English")}
                </button>
            </div>

            <p style={{ color: "gray", marginBottom: "20px", marginTop: "10px" }}>
                Escrito por: <strong>{historia.autor}</strong> | Gênero: {historia.genero}
            </p>
            
            {historia.imagem && (
                <img 
                    src={historia.imagem} 
                    alt="Capa da História" 
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "30px" }} 
                />
            )}
            
            {/* Mostra o texto original ou o traduzido */}
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", fontSize: "1.1rem", color: "#333" }}>
                {mostrarIngles ? textoTraduzido : historia.texto}
            </div>
        </div>
    );
}