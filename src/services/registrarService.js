export async function registrarUsuario(dados) {

    validarDados(dados);


    const resposta = await fetch("http://localhost:3001/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha
        }),
    });

    const dadosServidor = await resposta.json();


    if (!resposta.ok) {
        throw new Error(dadosServidor.erro || "Erro ao cadastrar.");
    }

    return dadosServidor;
}

function validarDados(dados){
    const erros = [];

    if (!dados.nome?.trim())
        erros.push("Nome é obrigatório!")

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))
        erros.push("Email inválido!")

    if (!dados.senha || dados.senha.length < 3)
        erros.push("Senha muito curta!")

    if (erros.length > 0)
        throw new Error(erros.join(" - "));
}
