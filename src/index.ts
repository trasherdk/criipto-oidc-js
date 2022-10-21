export {generate as generatePKCE} from './pkce';
export {parseQueryResponse, parseURLResponse} from './response';

import { type OpenIDConfiguration } from './OpenIDConfiguration';
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