import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('production CSP permits the app without unsafe script exceptions', async ({ page }) => {
  const headers = await readFile('dist/_headers', 'utf8');
  const csp = headers.match(/Content-Security-Policy: (.+)/)![1];
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (event) => {
      document.documentElement.setAttribute('data-csp-error', event.violatedDirective);
    });
  });
  await page.route('http://127.0.0.1:4173/', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), 'content-security-policy': csp },
    });
  });
  await page.goto('/');
  await expect(page.locator('#root')).not.toHaveAttribute('data-prerendered');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-csp-error');
});

test('renders all sections, working anchor links and a responsive layout', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Michael');
  for (const id of [
    'About',
    'Skills',
    'Services',
    'Experience',
    'Projects',
    'Education',
    'Contact',
  ]) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await page.goto('/#Projects');
  await expect(page.locator('#Projects')).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('delivers indexable content and metadata without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#Projects')).toContainText('Studymax');
  await expect(page.locator('#Education')).toContainText('Colegio');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://michaelfernadez.netlify.app/',
  );
  const structuredData = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  );
  expect(structuredData['@type']).toBe('Person');
  await context.close();
});

test('local images and crawl files exist', async ({ page, request }) => {
  await page.goto('/');
  const paths = await page
    .locator('img')
    .evaluateAll((images) =>
      images.map((image) => image.getAttribute('src')).filter((src) => src?.startsWith('/')),
    );
  for (const path of new Set([...paths, '/robots.txt', '/sitemap.xml'])) {
    const response = await request.get(path!);
    expect(response.ok(), path!).toBe(true);
    expect(response.headers()['content-type']).not.toContain('text/html');
  }
});

test('contact configuration fails safely or submits with controlled feedback', async ({ page }) => {
  await page.goto('/#Contact');
  const submit = page.locator('#Contact input[type="submit"]');
  if (await submit.isDisabled()) {
    await expect(page.getByRole('status')).toContainText('WhatsApp');
    return;
  }
  let requests = 0;
  await page.route('https://api.emailjs.com/**', async (route) => {
    requests++;
    await route.fulfill({ status: 200, body: 'OK' });
  });
  await page.locator('#contact-email').fill('test@example.com');
  await page.locator('#contact-name').fill('Test User');
  await page.locator('#contact-subject').fill('Prueba local');
  await page.locator('#contact-message').fill('Este mensaje solo usa una respuesta simulada.');
  await submit.click();
  await expect(page.getByRole('status')).not.toBeEmpty();
  await expect(page.locator('#contact-email')).toHaveValue('');
  expect(requests).toBe(1);
});
