# Awesome

## Running Multiple Apps in the Same src folder

Example: we make a lab called `new-lab`

1. Copy `main.ts` to `main.new-lab.ts`

2. Make a new app object in `angular-cli.json`, and set the `name` to `new-lab`, the `main` to `main.new-lab.ts`, and the `outDir` to `dist/new-lab`

3. Update the lazy loaded routes that start with `0-awesome/` to `new-lab/`
