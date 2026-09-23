import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isValidContact } from '../../src/features/contact/validation.ts';

const form = (overrides: Record<string, string> = {}) => {
  const data = new FormData();
  Object.entries({
    from_name: 'Ana López',
    from_email: 'ana@example.com',
    subject: 'Un proyecto',
    message: 'Me interesa conversar sobre un proyecto.',
    website: '',
    ...overrides,
  }).forEach(([key, value]) => data.set(key, value));
  return data;
};

test('accepts a valid message with accents', () => assert.equal(isValidContact(form()), true));
test('rejects bots, invalid email, whitespace and oversized messages', () => {
  for (const input of [
    { website: 'spam' },
    { from_email: 'bad' },
    { from_name: '  ' },
    { subject: ' ' },
    { message: 'short' },
    { message: 'x'.repeat(5001) },
  ]) {
    assert.equal(isValidContact(form(input)), false);
  }
});
