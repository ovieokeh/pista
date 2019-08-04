/* istanbul ignore file */
import '@babel/polyfill/noConflict';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';
import throng from 'throng';
import compression from 'compression';
import router from './router';

require('dotenv').config();

const server: express.Application = express();
const port = process.env.PORT || 7000;
const workers = process.env.WEB_CONCURRENCY || 3;
const env = process.env.NODE_ENV;

async function start() {
  server.use(cors());
  server.use(expressValidator());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(
    compression({
      filter: (req: express.Request) => {
        if (req.url.includes('api')) return false;
      }
    })
  );
  server.use('/api', router);

  server.use(express.static(path.join(__dirname, '../../frontend/dist')));

  server.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
  });

  server.listen(port, () => console.log(`server running on port ${port}`));
}

switch (env) {
  case 'production':
    throng({
      workers,
      lifetime: Infinity,
      start
    });
    break;

  default:
    start();
}

export default server;
