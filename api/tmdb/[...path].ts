// Proxy da API do TMDB (Vercel Function): o token fica só no servidor e nunca vai para o bundle do navegador.
// GET /api/tmdb/<caminho>?<query> → https://api.themoviedb.org/3/<caminho>?<query>

declare const process: { env: Record<string, string | undefined> }

const TMDB_BASE = 'https://api.themoviedb.org/3'
const SAFE_PATH = /^[a-z0-9/_-]{1,200}$/i

export async function GET(request: Request): Promise<Response> {
  const readToken = process.env.TMDB_READ_TOKEN?.trim()
  const apiKey = process.env.TMDB_API_KEY?.trim()
  if (!readToken && !apiKey) {
    return Response.json({ status_message: 'TMDB não configurado no servidor.' }, { status: 500 })
  }

  const url = new URL(request.url)
  const path = url.pathname.replace(/^\/api\/tmdb\/?/, '')
  if (!SAFE_PATH.test(path) || path.includes('..')) {
    return Response.json({ status_message: 'Caminho inválido.' }, { status: 400 })
  }

  const target = new URL(`${TMDB_BASE}/${path}`)
  url.searchParams.forEach((value, key) => {
    if (key !== 'api_key') target.searchParams.set(key, value)
  })
  if (!readToken && apiKey) target.searchParams.set('api_key', apiKey)

  const upstream = await fetch(target, {
    headers: {
      Accept: 'application/json',
      ...(readToken ? { Authorization: `Bearer ${readToken}` } : {}),
    },
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      'Cache-Control': upstream.ok
        ? 'public, s-maxage=600, stale-while-revalidate=3600'
        : 'no-store',
    },
  })
}
