├── 📂 tests/                    # Here are all the test files
│    ├── admin-tests.spec.js
│    ├── delegate-tests.spec.js
│    ├── ...
├── 📂 support/                  # Support files (login scripts, selectors, sessions)
│    ├── login-sessions/         # Sessions are stored here
│    │    ├── admin-session.json
│    │    ├── delegate-session.json
│    ├── login-owner-admin.spec.js
│    ├── login-delegate.spec.old.js
├── global-setup.js              # Global setup (saving session before tests)
├── playwright.config.cjs          # Playwright configuration
├── package.json                  # Dependencies and Playwright setup
├── README.md                      # Documentation

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.js - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.js - Demo Todo App end-to-end tests
  - .\socksplaywright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

npx playwright test --project='chromium' //only in chromium run



--headed	Run tests in headed browsers. Useful for debugging.
--browser	Run test in a specific browser. Available options are "chromium", "firefox", "webkit" or "all" to run tests in all three browsers at the same time.
--debug	Run tests with Playwright Inspector. Shortcut for PWDEBUG=1 environment variable and --timeout=0 --max-failures=1 --headed --workers=1 options.
-c <file> or --config <file>	Configuration file. If not passed, defaults to playwright.config.ts or socksplaywright.config.js in the current directory.
-c <dir> or --config <dir>	Configuration file. If not passed, defaults to playwright.config.ts or socksplaywright.config.js in the current directory.
--forbid-only	Whether to disallow test.only. Useful on CI.
-g <grep> or --grep <grep>	Only run tests matching this regular expression. For example, this will run 'should add to cart' when passed -g "add to cart". The regular expression will be tested against the string that consists of the test file name, test.describe name (if any) and the test name divided by spaces, e.g. my-test.spec.ts my-suite my-test.
--grep-invert <grep>	Only run tests not matching this regular expression. The opposite of --grep.
--global-timeout <number>	Total timeout for the whole test run in milliseconds. By default, there is no global timeout. Learn more about various timeouts.
--list list all the tests, but do not run them.
--max-failures <N> or -x	Stop after the first N test failures. Passing -x stops after the first failure.
--output <dir>	Directory for artifacts produced by tests, defaults to test-results.
--pass-with-no-tests	Allows the test suite to pass when no files are found.
--project <name>	Only run tests from one of the specified projects. Defaults to running all projects defined in the configuration file.
--quiet	Whether to suppress stdout and stderr from the tests.
--repeat-each <N>	Run each test N times, defaults to one.
--reporter <reporter>	Choose a reporter: minimalist dot, concise line or detailed list. See reporters for more information.
--retries <number>	The maximum number of retries for flaky tests, defaults to zero (no retries).
--shard <shard>	Shard tests and execute only selected shard, specified in the form current/all, 1-based, for example 3/5.
--timeout <number>	Maximum timeout in milliseconds for each test, defaults to 30 seconds. Learn more about various timeouts.
--trace <mode>	Force tracing mode, can be on, off, on-first-retry, on-all-retries, retain-on-failure
--ignore-snapshots	Whether to ignore snapshots. Use this when snapshot expectations are known to be different, e.g. running tests on Linux against Windows screenshots.
--update-snapshots or -u	Whether to update snapshots with actual results instead of comparing them. Use this when snapshot expectations have changed.
--workers <number> or -j <number>	The maximum number of concurrent worker processes that run in parallel.

Na Linuxe / macOS:
PWDEBUG=1 npx playwright test
Na Windows (v PowerShelli):
powershell

$env:PWDEBUG=1; npx playwright test
Na Windows (v CMD):
cmd
set PWDEBUG=1
npx playwright test
🔎 Čo PWDEBUG=1 robí?
Spustí testy v interaktívnom debug režime.

Otvorí prehliadač v "headed" móde (vidíš okno).

Po teste sa prehliadač nezatvorí automaticky, takže máš čas si pozrieť, čo sa stalo.

Test sa spomalí a umožní krokovanie (ako debugger).
npx playwright test --ui-host=0.0.0.0