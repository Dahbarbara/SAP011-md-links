/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
// eslint-disable-next-line import/extensions
import { lerMdLinks, validarLink } from '../mdLinks.js';

describe('validarLink', () => {
  it('should validate link', async () => {
    const link = { href: '[Markdown](https://pt.wikipedia.org/wiki/Markdown)', status: 200, ok: 'OK' };
    const mockFetch = jest.fn(() => Promise.resolve({ status: 200, ok: true }));
    global.fetch = mockFetch;

    await validarLink(link);

    expect(mockFetch).toHaveBeenCalledWith('[Markdown](https://pt.wikipedia.org/wiki/Markdown)');
    expect(link.status).toBe(200);
    expect(link.ok).toBe('OK');
  });

  it('should handle error when validating link', async () => {
    const link = { href: '[Markdown](https://pt.wikipedia.org/wiki/Markdown)', status: 'Error', ok: 'Fail' };
    const mockFetch = jest.fn(() => Promise.reject(new Error('Failed to fetch')));
    global.fetch = mockFetch;

    await validarLink(link);

    expect(mockFetch).toHaveBeenCalledWith('[Markdown](https://pt.wikipedia.org/wiki/Markdown)');
    expect(link.status).toBe('Error');
    expect(link.ok).toBe('Fail');
    expect(link.error).toBe('Failed to fetch');
  });
});

describe('lerMdLinks', () => {
  it('should read links without validation', async () => {
    const links = await lerMdLinks('./files/oneFile.md');
    expect(links).toHaveLength(4); // Substitua pelo número esperado de links no arquivo
    expect(links[0]).toHaveProperty('href');
    expect(links[0]).toHaveProperty('text');
  });

  it('should validate links', async () => {
    const Links = [
      { href: '[Markdown](https://pt.wikipedia.org/wiki/Markdown)', text: 'Example' },
      // Adicione mais links para teste

    ];
    const validatedLinks = await lerMdLinks('./files/oneFile.md', { validate: true });
    expect(validatedLinks).toHaveLength(4); // Substitua pelo número esperado de links validados
    expect(validatedLinks[0]).toHaveProperty('href');
    expect(validatedLinks[0]).toHaveProperty('text');
    expect(validatedLinks[0]).toHaveProperty('status');
    expect(validatedLinks[0]).toHaveProperty('ok');
  // eslint-disable-next-line linebreak-style
  });
});