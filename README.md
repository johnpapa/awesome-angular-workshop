# Angular: The Awesome Parts Workshop

by [Ward Bell](https://twitter.com/wardbell) and [John Papa](https://twitter.com/john_papa)

## Apps

All apps are in the `src/client` folder. There is a `src/server` folder containing a node server, as some other apps may or may not use it.

### 0-awesome

`0-awesome` is our basic template app. All other apps in the `src/client` folder are derived from `0-awesome` and then modified as needed.

## Define Multiple Apps in the Same _src/client_ folder

Example: make a lab called `new-lab`

1. Copy [`main.0-awesome.ts`](src/client/main.0-awesome.ts) to `main.new-lab.ts`

2. Add a new app object to the `"apps"` array in [`angular-cli.json`](./.angular-cli.json):

  * make it a copy of an existing app object
  * set its `"name"` to `"new-lab"`
  * set `"outDir"` to `"dist/new-lab"`
  * set `"main"` to `"main.new-lab.ts"` 

3. Update the lazy loaded routes that start with `0-awesome/` to `new-lab/` in `new-lab/app-routing.module.ts`.

4. Reset the toolbar title in `new-lab/core/toolbar/toolbar.component.html` to "Awesome New Lab".

## Build and Serve

Build and serve an app named `new-lab` with

```bash
ng serve -a new-lab -o
```

To run its _end-state_ at the same time,
open another terminal window, then build and serve on a different port.

```bash
ng serve -a new-lab-end -o -p 8400
```
