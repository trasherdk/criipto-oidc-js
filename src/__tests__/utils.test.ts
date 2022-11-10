import {describe, expect, it, jest} from '@jest/globals';
import { parseAuthorizeOptionsFromUrl } from '../index';

describe('misc utilities', () => {
  describe('parseAuthorizeOptionsFromUrl', () => {
    it('handles empty acr_values string', () => {
      const url = `https://example.com/oauth2/authorize?scope=openid&client_id=urn:grn:test&acr_values=`;

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.acr_values).toBe(undefined);
    });

    it('handles empty prompt string', () => {
      const url = `https://example.com/oauth2/authorize?scope=openid&client_id=urn:grn:test&prompt=`;

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.prompt).toBe(undefined);
    });

    it('handles empty response_mode string', () => {
      const url = "https://localhost:44362/oauth2/authorize?scope=openid&response_type=code&response_mode=&client_id=https%3a%2f%2flocalhost%3a44301%2f&redirect_uri=https%3a%2f%2fjwt.io%2f%3ftest%3dyesdzxcsdadasd&login_hint=&acr_values=urn%3agrn%3aauthn%3ase%3abankid&nonce=ecnon&state=etats&prompt=";

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.response_mode).toBe(undefined);
    });

    it('handles single entry defined acr_values string', () => {
      const url = `https://example.com/oauth2/authorize?scope=openid&client_id=urn:grn:test&acr_values=urn:grn:example`;

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.acr_values).toStrictEqual(["urn:grn:example"]);
    });

    it('handles multiple entry defined acr_values string', () => {
      const url = `https://example.com/oauth2/authorize?scope=openid&client_id=urn:grn:test&acr_values=urn:grn:example urn:grn:test`;

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.acr_values).toStrictEqual(["urn:grn:example", "urn:grn:test"]);
    });
  });
});