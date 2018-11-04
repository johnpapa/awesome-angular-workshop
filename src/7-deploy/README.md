# Deploy Lab

## Overview

- Requires: Docker and VS Code Docker extension
- Define the docker files
- Build and compose a local docker image
- Run the container locally
- Bonus
  - Inspect its logs
  - Explore its files
  - Debug the container

## Steps

1. Install the Docker extension for VS Code https://aka.ms/docker-code

1. In VS Code, go to the Command Palette and Add Docker files to the workspace

1. When prompted, choose port 9070

1. In docker-compose.yml, add a new environment for PUBLICWEB: ./publicweb

1. Repeat the previous step, but in the docker-compose.debug.yml file

1. Remove all code from the Dockerfile

1. Use the docker snippet docker-angular-multi-stage to generate the contents

1. Modify the ng build command to be RUN ng build 7-deploy

1. Modify the final COPY command to be COPY --from=client-app 1.
   /usr/src/app/dist/7-deploy ./

1. Run docker compose

1. Browse to http://localhost:9070
