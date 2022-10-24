import {describe, expect, it, jest} from '@jest/globals';
import { parseAuthorizeOptionsFromUrl } from '../index';

describe('misc utilities', () => {
  describe('parseAuthorizeOptionsFromUrl', () => {
    it('handles empty acr_values string', () => {
      const url = `https://example.com/oauth2/authorize?scope=openid&client_id=urn:grn:test&acr_values=`;

      const actual = parseAuthorizeOptionsFromUrl(url);

      expect(actual.acr_values).toBeUndefined;
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