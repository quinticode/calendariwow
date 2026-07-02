import { useState, useEffect } from "react";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/usuarios")
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Erro ao conectar com o banco de dados.");
                }
                return resposta.json();
            })
            .then(dados => {
                setUsuarios(dados);
                setCarregando(false);
            })
            .catch(erro => {
                console.error("Erro:", erro);
                setErro("Não foi possível carregar a lista de usuários.");
                setCarregando(false);
            });
    }, []);

    return (
        <section className="community-page">
            <h1 className="page-title">Comunidade de Leitores e Escritores</h1>
            
            {carregando && <p className="page-status">Carregando usuários...</p>}
            
            {erro && <p className="form-message msg-erro">{erro}</p>}
            
            {!carregando && !erro && usuarios.length === 0 && (
                <p className="page-status">Nenhum usuário cadastrado ainda.</p>
            )}

            {!carregando && !erro && usuarios.length > 0 && (
                <ul className="users-list">
                    {usuarios.map(usuario => (
                        <li key={usuario.id} className="user-card">
                            <strong className="user-card__name">{usuario.nome}</strong>
                            <span className="user-card__email">{usuario.email}</span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}