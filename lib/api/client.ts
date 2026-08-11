const API_BASE_URL = "https://voicevigilapi.vetkonect.com";

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_API_KEY");
}

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const headers = new Headers(options?.headers);

  headers.set("Content-Type", "application/json");
  headers.set("X-API-KEY", API_KEY!);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data: unknown;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!response.ok) {
    const message =
      (data as any)?.message ||
      (data as any)?.error ||
      JSON.stringify(data) ||
      "Something went wrong";

    throw new Error(message);
  }

  return data as T;
}

export const publicApi = {
  submitPartnership: (data: {
    fullname: string;
    email: string;
    contact: string;
    propose: string;
  }) =>
    fetch(`${API_BASE_URL}/vigil_partnership.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "a8f91c2b4e9d7f6a1c0b3d5e8f9a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (!res.ok) throw new Error(`Server returned status code ${res.status}`);
      return res.json();
    }),
};
