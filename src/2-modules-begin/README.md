# Modules Lab

## Overview

- Consolidate all widgets (directives/components) for re-use
- Create and put them all in a SharedModule
- Import the SharedModule everywhere that needs them
- `npm run 2-modules-begin`

## Steps

1. Create a new module named SharedModule

1. `ng g m shared 2-modules-begin`

1. Find all Angular Material, Forms, and Reactive Forms modules imported elsewhere
   in other NgModules in the project

1. As you find them, move them all to be imported into SharedModule (don’t forget
   to remove from original location)

1. Also remove the imports statements for @angular/forms and @angular/material from the original NgModules locations

1. Export everything from SharedModule

1. Import SharedModule in CoreModule, HeroesModule, and VillainsModule
