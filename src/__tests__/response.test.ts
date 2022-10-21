import {describe, expect, it, jest} from '@jest/globals';
import { parseURLResponse } from '../response';

describe('response utilities', () => {
  describe('parseQueryResponse', () => {
    [
      {code: Math.random().toString(), prefix: '?'},
      {code: Math.random().toString(), state: Math.random().toString(), prefix: '?'},
      {code: Math.random().toString(), prefix: '#'},
      {code: Math.random().toString(), state: Math.random().toString(), prefix: '#'}
    ].forEach(theory => {
      it(`parses ${theory.prefix}code response ${theory.state ? 'with state' : 'without state'}`, () => {
        let url = `https://example.com/${theory.prefix}code=${theory.code}`;
        if (theory.state) url += `&state=${theory.state}`;

        const actual = parseURLResponse(url);

        assertDefined(actual);
        expect(actual.state).toBe(theory.state);
        expect("code" in actual ? actual.code : null).toBe(theory.code);
      });
    });

    [
      {id_token: Math.random().toString(), prefix: '?'},
      {id_token: Math.random().toString(), state: Math.random().toString(), prefix: '?'},
      {id_token: Math.random().toString(), prefix: '#'},
      {id_token: Math.random().toString(), state: Math.random().toString(), prefix: '#'}
    ].forEach(theory => {
      it(`parses ${theory.prefix}id_token response ${theory.state ? 'with state' : 'without state'}`, () => {
        let url = `https://example.com/${theory.prefix}id_token=${theory.id_token}`;
        if (theory.state) url += `&state=${theory.state}`;

        const actual = parseURLResponse(url);

        assertDefined(actual);
        expect(actual.state).toBe(theory.state);
        expect("id_token" in actual ? actual.id_token : null).toBe(theory.id_token);
      });
    });

    [
      {error: Math.random().toString(), prefix: '?'},
      {error: Math.random().toString(), error_description: Math.random().toString(), prefix: '?'},
      {error: Math.random().toString(), state: Math.random().toString(), prefix: '?'},
      {error: Math.random().toString(), error_description: Math.random().toString(), state: Math.random().toString(),prefix: '?'},
      {error: Math.random().toString(), prefix: '#'},
      {error: Math.random().toString(), error_description: Math.random().toString(), prefix: '#'},
      {error: Math.random().toString(), state: Math.random().toString(), prefix: '#'},
      {error: Math.random().toString(), error_description: Math.random().toString(), state: Math.random().toString(),prefix: '#'},
    ].forEach(theory => {
      it(`parses ${theory.prefix}error response ${theory.state ? 'with state' : 'without state'}`, () => {
        let url = `https://example.com/${theory.prefix}error=${theory.error}`;
        if (theory.error_description) url += `&error_description=${theory.error_description}`;
        if (theory.state) url += `&state=${theory.state}`;

        const actual = parseURLResponse(url);

        assertDefined(actual);
        expect(actual.state).toBe(theory.state);
        expect("error" in actual ? actual.error : null).toBe(theory.error);
        expect("error" in actual ? actual.error_description : null).toBe(theory.error_description);
      });
    });
  });
});

function assertDefined<T>(arg: T): asserts arg is NonNullable<T> {
  expect(arg).toBeDefined();
}