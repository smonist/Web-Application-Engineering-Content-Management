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
- hash=00b096c3fce0

## DOCKER ENV VARIABLES

Following variables have to be set:

- FRONTEND_PORT
- BACKEND_PORT
- DBS_PORT

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
