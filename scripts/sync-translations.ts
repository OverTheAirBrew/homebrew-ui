import { outputFile } from 'fs-extra';
import fetch from 'isomorphic-unfetch';
import { join } from 'path';

Promise.resolve()
  .then(async () => {
    const response = await fetch('http://localhost:9090/translations');
    const data = await response.json();

    for (const d of Object.keys(data.translations)) {
      const translationData = data.translations[d];

      await outputFile(
        join(__dirname, '..', 'public', 'locales', `${d}.json`),
        JSON.stringify(translationData, null, 2),
        {},
      );
    }

    await outputFile(
      join(__dirname, 'locale-config.json'),
      JSON.stringify({
        locales: data.locales,
        namespaces: data.namespaces,
      }),
      {},
    );

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
