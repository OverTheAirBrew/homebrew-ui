import { outputFile } from 'fs-extra';
import { join } from 'path';

Promise.resolve()
  .then(async () => {
    await outputFile(
      join(__dirname, '..', 'public', 'locales', 'en/common.json'),
      JSON.stringify({}),
    );

    await outputFile(
      join(__dirname, '..', 'locale-config.json'),
      JSON.stringify({
        locales: ['en'],
        namespaces: ['common'],
      }),
    );

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
