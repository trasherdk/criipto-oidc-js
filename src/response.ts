export type CodeResponse = {
  code: string
  state?: string
}
export type IdTokenResponse = {
  id_token: string
  state?: string
}
export type ErrorResponse = {
  error: string
  error_description?: string
  state?: string
}

export type AuthorizeResponse = CodeResponse | IdTokenResponse | ErrorResponse;

export function parseQueryResponse(input: string | URLSearchParams): AuthorizeResponse | null {
  if (!input) return null;
  if (typeof input === "string") {
    if (!input.length) return null;
    if (input.startsWith('?') || input.startsWith('#')) input = input.substring(1);
    input = new URLSearchParams(input);
  }

  if (input.get('code')) {
    return {
      code: input.get('code')!,
      state: input.get('state') ?? undefined
    };
  }

  if (input.get('id_token')) {
    return {
      id_token: input.get('id_token')!,
      state: input.get('state') ?? undefined
    };
  }

  if (input.get('error')) {
    return {
      error: input.get('error')!,
      error_description: input.get('error_description') ?? undefined,
      state: input.get('state') ?? undefined
    };
  }

  return null;
}

export function parseURLResponse(input: string | URL) {
  input = typeof input === "string" ? new URL(input) : input;

  const queryResponse = parseQueryResponse(input.search);
  if (queryResponse) return queryResponse;
  return parseQueryResponse(input.hash);
}