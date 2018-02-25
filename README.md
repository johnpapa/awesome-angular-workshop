# Angular: The Awesome Parts Workshop

by [Ward Bell](https://twitter.com/wardbell) and [John Papa](https://twitter.com/john_papa)

## Apps

All apps are in the `src/client` folder. There is a `src/server` folder containing a node server, as some other apps may or may not use it.

### 0-awesome

`0-awesome` is our basic template app. All other apps in the `src/client` folder are derived from `0-awesome` and then modified as needed.

## Running Multiple Apps in the Same src folder

Example: we make a lab called `new-lab`

1. Copy `main.ts` to `main.new-lab.ts`

2. Make a new app object in `angular-cli.json`, and set the `name` to `new-lab`, the `main` to `main.new-lab.ts`, and the `outDir` to `dist/new-lab`

3. Update the lazy loaded routes that start with `0-awesome/` to `new-lab/`
