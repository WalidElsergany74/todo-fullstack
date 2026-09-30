const API_URL = process.env.API_URL ?? "http://localhost:8000/api/v1";

interface FetchOptions extends RequestInit {
  tags?: string[];
  revalidate?: number | false;
}

export async function serverFetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { tags, revalidate, ...fetchOptions } = options;

  const nextOptions: RequestInit["next"] = {};
  if (tags && tags.length > 0) {
    nextOptions.tags = tags;
  }
  if (revalidate !== undefined) {
    nextOptions.revalidate = revalidate;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...fetchOptions,
    next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `API Error ${response.status}: ${response.statusText} — ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}
