# Angular: The Awesome Parts Workshop

by [Ward Bell](https://twitter.com/wardbell) and [John Papa](https://twitter.com/john_papa)

## Apps

All apps are in the `src/client` folder. There is a `src/server` folder containing a node server, as some other apps may or may not use it.

### 0-awesome

`0-awesome` is our basic template app. All other apps in the `src/client` folder are derived from `0-awesome` and then modified as needed.

### 1-router

**TBD**

### 2-rxjs

**TBD**

### 3-style

**TBD**

### 4-reactive

`4-reactive` demonstrates a (1) reactive, (2) immutable, (3) CQRS app built with plain services rather than _ngrx_.
See how the basic app changes to conform to these three principles.

### 5-ngrx

`5-ngrx-begin` refactors the `4-reactive` _Heroes_ to use **ngrx**. Only partly done.
`5-ngrx-end` is the state of the **ngrx** app after completing the `5-ngrx-begin` lab.

### 6-ngrx-data

**TBD**

### 7-deploy

**TBD**

## Define Multiple Apps in the Same _src/client_ folder

Example: make a lab called `n-new-lab` where `n` is an integer.

1. Create the `n-new-lab` _app folder_ under `src/client`.


2. Add a new app object to the `"apps"` array in [`angular-cli.json`](./.angular-cli.json):

  * make it a copy of an existing app object
  * set its `"name"` to `"n-new-lab"`
  * set `"outDir"` to `"dist/n-new-lab"`
  * set `"main"` to `"main.n-new-lab.ts"`


3. Update the lazy loaded routes that start with `0-awesome/` to `n-new-lab/` in `n-new-lab/app-routing.module.ts`.


4. Reset the toolbar title in `n-new-lab/core/toolbar/toolbar.component.html` to "Awesome Lab n: New Lab".

>Hint: steps #3 and #4 are easy with search-and-replace _AFTER_ limiting `files-to-include` to `"n-new-lab"`.


5. Copy [`main.0-awesome.ts`](src/client/main.0-awesome.ts) to `main.n-new-lab.ts` and update the paths to the app modules:
    ```
    import { AppModule } from './n-new-lab/app.module';
    import { AppDevModule } from './n-new-lab/app-dev.module';
    ```

6. Add a node script to the [`package.json`](package.json), setting the last
two port digits (first digit is for `n`, second for the `new-lab` variations).

    ```bash
    "0-new-lab": "ng serve -a n-new-lab -o -p 90n0",
    ```

    >All labs run in the port 9000 series.

## Build and Serve
To see a **list of the npm lab scripts**

```bash
npm run
```

Build and serve an app named `n-new-lab` with npm or yarn

```bash
yarn n-new-lab
npm run n-new-lab
```

Or go to the CLI directly

```bash
ng serve -a n-new-lab -o
```

To run its _end-state_ (`e`) at the same time,
open another terminal window, then build and serve on a different port (where the last digits match `n` and `e`).

```bash
ng serve -a n-new-lab-end -o -p 90{n}{e}
```
