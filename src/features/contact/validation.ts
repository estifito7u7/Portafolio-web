export const CONTACT_COOLDOWN_MS = 30_000;
export function isValidContact(data: FormData): boolean {
  const value = (key: string) => String(data.get(key) ?? '').trim();
  const email = value('from_email');
  return (
    !value('website') &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    value('from_name').length >= 2 &&
    value('from_name').length <= 100 &&
    value('subject').length >= 2 &&
    value('subject').length <= 150 &&
    value('message').length >= 10 &&
    value('message').length <= 5000
  );
}
