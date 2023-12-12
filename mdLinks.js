/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-unresolved

// import { bgYellow, red } from 'chalk'; // Módulo para estilizar a saída no terminal
const { readFile } = require('fs'); // Módulo para lidar com o sistema de arquivos

function validarLink(link) {
  return new Promise((resolve) => {
    // Realiza uma requisição para o link fornecido
    fetch(link.href)
      .then((response) => {
        // Define o status e 'ok' com base na resposta HTTP
        link.status = response.status;
        link.ok = response.ok ? 'OK' : 'Fail';

        // Verifica se a resposta foi bem-sucedida
        resolve(link); // Resolve a Promessa com o link validado
      })
      .catch((error) => {
        // Caso haja um erro na requisição, trata o erro e rejeita a Promessa
        link.status = 'Error';
        link.ok = 'Fail';
        link.error = error.message;
        // eslint-disable-next-line prefer-promise-reject-errors
        resolve(link);
        // reject(`Erro na requisição para ${link.href}: ${error.message}`);
      });
  });
}

// eslint-disable-next-line import/prefer-default-export
function lerMdLinks(caminhoDoArquivo, options = { validate: false }) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    readFile(caminhoDoArquivo, 'utf-8', (err, data) => {
      if (err) reject(err);

      const regex = /\[([^\]]+)\]\((http[^\s)]+)\)/g;
      const linksEncontrados = [];

      let match;
      // eslint-disable-next-line no-cond-assign
      while ((match = regex.exec(data)) !== null) {
        // eslint-disable-next-line no-unused-vars
        const [_, text, href] = match;
        linksEncontrados.push({ href, text });
      }

      if (!options.validate) {
        // Se a opção 'validate' for false, resolve a Promessa com os links encontrados
        return resolve(linksEncontrados);
      }

      // Caso contrário, mapeia os links encontrados para a função de validação
      const linksValidados = linksEncontrados.map((link) => validarLink(link));

      // Aguarda todas as validações terminarem para resolver a Promessa com os links validados
      Promise.all(linksValidados)
        .then((links) => resolve(links))
        .catch((error) => reject(error));
    });
  });
}

// Chamada para ler os links sem validar
lerMdLinks('./files/oneFile.md', { validate: true })
  .then((links) => {
    console.log(JSON.stringify(links, null, 2));
  })
  .catch((err) => {
    console.error(err);
  });
// eslint-disable-next-line semi
module.exports = { lerMdLinks, validarLink }
