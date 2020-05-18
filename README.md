# Web-Application-Engineering-Content-Management

# Technologies

For the application followin technologies are going to be used:

- Datenbankschicht = Postgres
- Webserver = Node.js
- Single-Page Web-App = Angular

# DOCKER Settings

- docker-hub-repo=030395/waecm-2020-group-20-bsp-1-backend:v1
- name=waecm-2020-group-20-bsp-1-backend
- hash=59bf737acb40

## DOCKER IMG frontend

- docker-hub-repo=030395/waecm-2020-group-20-bsp-1-frontend:v1
- name=waecm-2020-group-20-bsp-1-frontend
- hash=a506c1b3de87

## DOCKER ENV VARIABLES

Following variables have to be set:

- REDDIT_CLIENT_ID
- REDDIT_CLIENT_SECRET
- REDDIT_USERNAME
- REDDIT_PASSWORD

## DBS ENV VARIABLES

- POSTGRES_PASSWORD: admin
- POSTGRES_USER: admin
- POSTGRES_DB: app-dbs

## PORTS

Current Port application is using are:

- FRONTEND_PORT=4200
- BACKEND_PORT=3000
- DBS_PORT=5432

## DOCKER VOLUME

"app" volume is created for the application
