export async function registrarUsuario(dados){
    validarDados(dados)


    //mudar isso aqui futuramente
    await new Promise((res) => setTimeout(res, 800));


    return {
        sucesso: true,
        id: Math.random().toString(36).slice(2,9),
        mensagem: `Usuário ${dados.nome} cadastrado com sucesso com o email ${dados.email} !`
    };
}

function validarDados(dados){
    const erros = [];

    if (!dados.nome?.trim())
        erros.push("Nome é obrigatório!")

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))
        erros.push("Email inválido!")

    if (!dados.idade || dados.idade < 1 || dados.idade > 120)
        erros.push("Idade inválida!")

    if (!dados.aceiteTermos)
        erros.push("Você deve aceitar os termos!")

    if (erros.length > 0)
        throw new Error(erros.join(" - "));
}
