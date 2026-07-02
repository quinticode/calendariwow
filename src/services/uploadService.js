

const UPLOAD_ENDPOINT = "http://localhost:3001/upload";


export async function enviarImagem(file) {


  const formData = new FormData();

  formData.append("imagem", file);

  const token = localStorage.getItem("token");


  const response = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",

    headers: token ? { Authorization: `Bearer ${token}` } : {},

    body: formData,
  });

  if (!response.ok) {

    const data = await response.json().catch(() => ({}));

    throw new Error(data.erro || "Erro ao enviar imagem.");
  }

  return response.json();
}