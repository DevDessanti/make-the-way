/**
 * Cliente HTTP único da aplicação.
 * Toda chamada de dados passa por aqui — trocar a API fake pela real
 * é só mudar NEXT_PUBLIC_API_URL no .env.local.
 */
const URL_BASE_DA_API = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function buscarDaApi(rota) {
  const resposta = await fetch(`${URL_BASE_DA_API}${rota}`, {
    headers: { "Content-Type": "application/json" },
    // Quando a API real exigir autenticação, o token entra aqui:
    // headers: { Authorization: `Bearer ${token}` },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao buscar ${rota}`);
  }
  return resposta.json();
}