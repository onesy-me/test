const path = require('path');
const http = require('http');
const fg = require('fast-glob');

const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;

const run = async () => {
  const app = express();

  app.set('view engine', 'html');
  app.set('json spaces', 2);
  app.set('subdomain offset', 1);

  app.use(express.static(path.join(__dirname, '../../../')));

  // All the body parsers
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.get('/success', async (req, res) => {
    return res.status(201).json({
      response: ['a'],
      pagination: {
        total: 4,
        next: 'a',
        previous: 'a1'
      },
      meta: {
        status: 201
      }
    });
  });

  app.get('/error', async (req, res) => {
    return res.status(400).json({
      meta: {
        status: 400,
        message: 'a'
      }
    });
  });

  app.get('/', cors({ origin: '*' }), async (req, res) => {
    const paths = (await fg('build/umd/*.prod.min.js', { onlyFiles: true }));

    paths.push(
      'https://unpkg.com/@amaui/utils@latest/umd/amaui-utils.prod.min.js',

      'https://unpkg.com/@amaui/date@latest/umd/amaui-date.production.min.js',

      'https://unpkg.com/@amaui/diff@latest/umd/amaui-diff.production.min.js',

      'https://unpkg.com/react@latest/umd/react.production.min.js'
    );

    let value = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  scripts
</head>
<body>
  a
</body>
</html>
`;

    let scripts = ``;

    paths.forEach(item => scripts += `<script src='${item}'></script>\n`);

    value = value.replace('scripts', scripts);

    return res.send(value);
  });

  app.all('*', async (req, res) => {
    const response = {
      method: req.method,
      url: req.url,
      body: req.body,
    };

    if (['HEAD', 'OPTIONS'].indexOf(response.method) === -1) return res.status(200).json(response);

    res.set('amaui-method', response.method);
    res.set('amaui-url', response.url);

    return res.send();
  });

  const server = http.createServer(app);

  server.listen(port, error => {
    if (error) throw error;

    console.log(`Website started 🌱 at port ${port}`);
  });
};

run();
