# Playwright-GUI-API-example

### The test project for Playwright GUI/API testing demo purposes

## Prerequisites

* **node >= 12.22.7**;
* **npm >= 6.14.15**

## Use:

- setup project:

```
npm i -D @playwright/test && npx playwright install && npx playwright install-deps
```

- run GUI tests with all three browsers headlessly AND API tests

```
npx playwright test
```

- run GUI tests with all three browsers in headed mode

```
npx playwright test tests/gui.spec.ts --headed
```

- run GUI tests with specific browser (options: chromium, firefox, webkit)

```
npx playwright test tests/gui.spec.ts --project={{OPTION}}
```

- run API tests

```
npx playwright test tests/api.spec.ts --project=chromium
```

## Reporting:

- Reports are automatically created in `<PROJECT_ROOT>/playwright-report` directory;
- Each CircleCI build artefacts contain two separate reports in **Build details > Artifacts**:
  `api-report/index.html`, `gui-report/index.html`

## Parallelism:

- By default, cross-browser tests execution done concurrently and independently for each browser (project).
- Moreover, GUI tests (considered as 'slow') are written to be executed in parallel to achieve the best execution time.
- Each process is executed by worker (OS process), their number could be limited using `--workers=` option in
  above-mentioned run commands.
- Maximum number of workers is: `numOfProjects * numOfGuiTests`, currently: `3 * 2 = 6`
