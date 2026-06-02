const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://voicevigil.vetkonect.com'

const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ?? ''

// ─── Core fetch helper ──────────────────────────────────────────────────────

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
      ...options?.headers,
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message ?? 'Something went wrong')
  }

  return data as T
}
