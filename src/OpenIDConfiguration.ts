export type OpenIDConfiguration = {
  client_id: string;
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  end_session_endpoint: string;
  response_types_supported: string[];
  response_modes_supported: string[];
  subject_types_supported: string[];
  acr_values_supported: string[];
  id_token_signing_alg_values_supported: string[];
}

export class OpenIDConfigurationManager {
  authority: string;
  clientID: string

  constructor(authority: string, clientID: string) {
    if (!authority.startsWith('http')) throw new Error(`OpenIDConfigurationManager authority should start with https://`);
    this.authority = authority;
    this.clientID = clientID;
  }

  async fetch(): Promise<OpenIDConfiguration> {
    const response = await fetch(`${this.authority}/.well-known/openid-configuration?client_id=${this.clientID}`);
    const metadata : OpenIDConfiguration = await response.json();
    metadata.client_id = this.clientID;
    return metadata;
  }
}