const mdLinks = require('../mdLinks');

// eslint-disable-next-line no-undef
describe('mdLinks', () => {
  // eslint-disable-next-line no-undef
  it('Deve retornar um array de objetos com as propriedades href, text e file', () => mdLinks('./files/oneFile.md')
    .then((result) => {
      // Verificar se o resultado possui a estrutura esperada
      // eslint-disable-next-line no-undef
      expect(result).toEqual(
        // eslint-disable-next-line no-undef
        expect.arrayContaining([
          // eslint-disable-next-line no-undef
          expect.objectContaining({
            // eslint-disable-next-line no-undef
            href: expect.any(String),
            // eslint-disable-next-line no-undef
            text: expect.any(String),
            // eslint-disable-next-line no-undef
            file: expect.any(String),
          }),
        ]),
      );
    })
    .catch((error) => {
      // Tratar qualquer erro que ocorra durante o teste
      throw new Error(error);
    }));
});
