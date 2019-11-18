# Angular: The Awesome Parts Workshop

by [Ward Bell](https://twitter.com/wardbell) and [John Papa](https://twitter.com/john_papa)

## Apps

All apps are in the `src` folder. There is a `src/server` folder containing a node server, as some other apps may or may not use it.

### 0-awesome

`0-awesome` is our basic template app. All other apps in the `src` folder are derived from `0-awesome` and then modified as needed.

### 1-router

`1-routing-begin` is our beginning lab for routing and `1-routing-begin-end` is the end state.

We also have a routing guard lab. `1-routing-guards-begin` and `1-routing-guards-end`.

### 2-Modules

`2-modules-begin` and `2-modules-end`.

### 3-rxjs

How to communicate changes across the app with RxJS

### 4-reactive

`4-reactive` demonstrates a (1) reactive, (2) immutable, (3) CQRS app built with plain services rather than _ngrx_.
See how the basic app changes to conform to these three principles.

### 5-ngrx

`5-ngrx-begin` refactors the `4-reactive` _Heroes_ to use **ngrx**. Only partly done.
`5-ngrx-end` is the state of the **ngrx** app after completing the `5-ngrx-begin` lab.

### 6-ngrx-data

`6-ngrx-data-begin` refactors `5-ngrx-end` to use _ngrx-data_ for Heroes.
`6-ngrx-data-end` does the same to Villains.
It demonstrates additional metadata features, including optimistic add and update,
which require a client-side Id Generator for Adds (see VillainService).

### 7-deploy

Locally

1. Run `npm run 7-deploy-build` to build it.
2. Run `npm run 7-deploy-serve` to serve it.
3. Kill the process

Locally with Docker

1. Run `docker compose up` from the command palette in VS Code.
2. Choose the debug option

## Define Multiple Apps in the Same \_src folder

Example: make a lab called `n-new-lab-begin` where `n` is an integer.

1.  Create the `n-new-lab-begin` _app folder_ under `src`.

2)  Add a new app object to the `"apps"` array in [`angular-cli.json`](./.angular-cli.json):

- make it a copy of an existing app object
- set `"name"` to `"n-new-lab-begin"`
- set `"appRoot"` to `"n-new-lab-begin"`
- set `"outDir"` to `"dist/n-new-lab-begin"`
- set `"main"` to `"main.n-new-lab-begin.ts"`

3.  Update the lazy loaded routes that start with `0-awesome/` to `n-new-lab-begin/` in `n-new-lab-begin/app-routing.module.ts`.

> Hint: easy with search-and-replace _AFTER_ limiting `files-to-include` to `"n-new-lab-begin"`.

4.  Copy [`main.0-awesome.ts`](src/main.0-awesome.ts) to `main.n-new-lab-begin.ts` and update the paths to the app modules:

    ```
    import { AppModule } from './n-new-lab-begin/app.module';
    import { AppDevModule } from './n-new-lab-begin/app-dev.module';
    ```

5.  Add a node script to the [`package.json`](package.json), setting the last
    two port digits (first digit is for `n`, second for the `new-lab-begin` variations).

    ```bash
    "0-new-lab-begin": "ng serve -a n-new-lab-begin -o -p 90n0",
    ```

    > All labs run in the port 9000 series.

6.  Update the `labTitle` property of the `ToolbarComponent` to `n-new-lab-xxx`, where n is the number of the lab and xxx is either `begin` or `end`

    ```typescript
    export class ToolbarComponent {
      labTitle = 'n-new-lab-begin';
      labState = 'begin';
    }
    ```

7.  Uncomment the appropriate lab state (e.g. begin or end) in `toolbar.component.scss`

    ```css
    // @include primary-background-contrast-color; // end
    // @include accent-background-color; // begin
    ```

## Build and Serve

To see a **list of the npm lab scripts**

```bash
npm run
```

Build and serve an app named `n-new-lab-begin` with npm or yarn

```bash
yarn n-new-lab-begin
npm run n-new-lab-begin
```

Or go to the CLI directly

```bash
ng serve -a n-new-lab-begin -o
```

To run its _end-state_ (`e`) at the same time,
open another terminal window, then build and serve on a different port (where the last digits match `n` and `e`).

```bash
ng serve -a n-new-lab-end -o -p 90{n}{e}
```
