import { outputFile } from 'fs-extra';
import { join } from 'path';

Promise.resolve()
  .then(async () => {
    await outputFile(
      join(__dirname, '..', 'public', 'locales', 'en/common.json'),
      JSON.stringify({}),
    );

    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
