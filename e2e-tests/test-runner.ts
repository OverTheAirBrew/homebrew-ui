import * as dotenv from 'dotenv';
import createTestCafe from 'gherkin-testcafe';

dotenv.config();

async function runTests() {
  let testcafe: GherkinTestCafe;
  let runner: GherkinTestcafeRunner;

  await createTestCafe()
    .then((tc: GherkinTestCafe) => {
      testcafe = tc;
      runner = tc.createRunner();

      return runner
        .src([
          'e2e-tests/features/**/*.feature',
          'e2e-tests/step_definitions/**/*.js',
        ])
        .browsers(['chrome'])
        .reporter([
          'spec',
          {
            name: 'junit',
            output: './reports/junit/junit.xml',
          },
        ])
        .screenshots({
          path: './reports/screenshots',
          takeOnFails: true,
          pathPattern:
            '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
          fullPage: true,
        })
        .run({
          // quarantineMode: true,
          speed: 0.5,
        });
    })
    .then((failedCount: number) => {
      console.log(`Completed run with failedCount=${failedCount}`);
      testcafe.close();
      if (failedCount > 0) {
        throw new Error('Failed Tests');
      }
    });
}

Promise.resolve()
  .then(async () => {
    await runTests();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
