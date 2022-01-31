import axios from 'axios';
import { outputFile } from 'fs-extra';
import { createServer } from 'http';
import next from 'next';
import { join } from 'path';

const IS_DEV = process.env.NODE_ENV === 'development';

Promise.resolve()
  .then(async () => {
    const { data } = await axios.get('http://localhost:9090/translations');

    for (const d of Object.keys(data.translations)) {
      const translationData = data.translations[d];
      outputFile(
        join(__dirname, 'public', 'locales', `${d}.json`),
        JSON.stringify(translationData, null, 2),
        {},
      );
    }

    const app = next({ dev: IS_DEV });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      createServer((req, res) => {
        handle(req, res);
      }).listen(3000);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
