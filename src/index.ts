export {generate as generatePKCE} from './pkce';
export {parseQueryResponse, parseURLResponse} from './response';

import { type OpenIDConfiguration } from './OpenIDConfiguration';
import { AuthorizeResponse } from './response';
export {OpenIDConfigurationManager, type OpenIDConfiguration} from './OpenIDConfiguration';

export function buildLogoutURL(
  configuration: OpenIDConfiguration,
  options: {
    id_token_hint?: string,
    logout_hint?: string,
    post_logout_redirect_uri?: string,
    state?: string,
    ui_locales?: string
  }
) : URL {
  const url = new URL(configuration.end_session_endpoint);

  for (const [k, v] of Object.entries(options)) {
    url.searchParams.set(k, v);
  }
  return url;
}

export async function codeExchange(
  configuration: OpenIDConfiguration,
  options: {
    code: string,
    redirect_uri: string
    code_verifier: string
  }
) : Promise<AuthorizeResponse> {
  const body = new URLSearchParams();
  body.append('grant_type', "authorization_code");
  body.append('code', options.code);
  body.append('client_id', configuration.client_id);
  body.append('redirect_uri', options.redirect_uri);
  body.append('code_verifier', options.code_verifier);

  const response = await fetch(configuration.token_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'omit',
    body: body.toString()
  });

  const payload = await response.json();

  return {id_token: payload.id_token};
}