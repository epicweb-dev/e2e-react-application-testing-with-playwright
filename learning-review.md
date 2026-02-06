# Learning review: E2E React Application Testing with Playwright (EpicShop workshop)

Environment: Linux 6.1, Node v22.21.1, npm v10.9.4.

Note: The requested evaluation rubric includes “advance understanding of MCP servers”, but this workshop is about Playwright E2E testing (not MCP). I treated that dimension as “does this step meaningfully advance the stated Playwright testing skill.”

## Exercise 01 - Basics

### Step 01 - Install & configure

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The instructions/screenshot imply asserting a heading related to “Epic Web”, but the current Epic Web homepage has multiple headings containing “Epic Web”, which triggers Playwright strict-mode violations if you use a partial accessible name (e.g. `name: 'Epic Web'`). The official solution uses the specific accessible name `Full Stack Workshop Training for Professional Web Developers`.

### Step 02 - Running the app

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - Running `npm test` in a fresh `playground/` required additional setup that isn’t mentioned in the step instructions:
    - `npm run post:playground` (to run `prisma generate --sql`, otherwise the dev server fails with missing `.prisma/client/sql/index.mjs`).
    - Installing the correct Playwright browsers for the `playground`’s Playwright version (otherwise Playwright errors that the Chromium executable doesn’t exist and asks to run `npx playwright install`).

## Exercise 02 - Test setup

### Step 01 - Custom fixtures

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - If you try to follow the “run `npm test`” instruction from a fresh `playground/`, you still need the same extra setup from the prior step (Prisma generate + Playwright browser install) before the app/tests can run.

### Step 02 - Mock databases

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**: no notes.

### Step 03 - Authentication

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The step instructs installing `playwright-persona`, but it’s already present in `devDependencies` for this exercise’s `playground` app, which can be confusing when following along literally.

### Step 04 - API mocking

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The step instructs installing `msw` and `@msw/playwright`, but they’re already present in `devDependencies` for this exercise’s `playground` app (at least in this repo snapshot), which makes the first instruction redundant/confusing.

### Step 05 - Test data

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - In the inline comments for `tests/e2e/notes-list.test.ts`, the instructions refer to a `data` property when calling `createNotes`, but the utility is specified/typed to accept `notes` (and the official solution uses `notes`). This is small but can cause a brief “which key is correct?” speed bump.

## Exercise 03 - Guides

### Step 01 - Recording interactions

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The core workflow depends on interactive VS Code UI (Playwright extension, “Show browser”, “Record at cursor”). In a non-GUI / remote / CI-style environment, that workflow can’t be followed literally, even though the underlying exercise can still be completed by writing the equivalent actions manually.

### Step 02 - Test annotations

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**: no notes.

### Step 03 - Blocking unneeded requests

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**: no notes.

## Exercise 04 - Debugging

### Step 01 - UI mode

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The recommended workflow is to run Playwright in UI mode (`--ui`) and step through the test. That’s great locally, but it’s not directly runnable in a headless/remote environment without a GUI. The underlying bug fix itself is straightforward once you know what to look for (a mismatched accessible name expectation).

### Step 02 - Trace viewer

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - The exercise references a `trace.zip` in the app root, but no such file is present in this repository snapshot (neither in `playground/` nor in the exercise directory), so the “open the trace viewer” command can’t be followed as written.
  - The instructions say the test “fails on CI but works locally”, but in this environment the provided `notes-create` test also failed locally with the same timeout (click intercepted by a `dialog-overlay`), which undermines the intended debugging contrast.

### Step 03 - Live debugging

- **Learning outcomes**: no notes.
- **Instructional clarity**: no notes.
- **Cognitive load and pacing**: no notes.
- **Examples and exercise alignment**: no notes.
- **Mechanical correctness**:
  - Like the “recording” exercise, the primary workflow depends on VS Code Playwright extension UI (adding breakpoints, running in “Show browser” mode), which is not feasible in headless/remote environments.
  - The exercise frames `logout.test.ts` as failing (and it does fail in this environment), but there’s no corresponding “solution” code change for learners to diff against. That makes it hard to validate understanding beyond “I can reproduce the failure.”

