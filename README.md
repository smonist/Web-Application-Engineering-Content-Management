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

## COOKIE BANNER CUSTOM ELEMENT

To include the cookie banner into a website one has to include [this](https://raw.githubusercontent.com/YannicEl/cookieBanner/master/cookieBanner.js) script. The element itslef can then be used with the selector 'cookie-banner' (`<cookie-banner></cookie-banner>`).

## COOKIE BANNER TEST

the cookie banner can be de- and activated on http://localhost:4200/policy

# SHORT DESCRIPTION WHY WE USED WHAT WE USED

## CI

We have chosen GitHub actions for our CI because it seemed like the obvious answers. Our repro is on GitHub so actions looked like a perfect fit. After using it we can say GitHub actions sucks. Troubleshooting and testing is nearly impossible as you cannot trigger an action manually. You need to commit something in order to trigger an action which unnecessarily clutters the commit history. All in all, 0/10 for GitHub actions, use Gitlab instead.

## CUSTOM COMPONENT

We tried to make custom components with angular. After 40 mins of troubleshooting stupid build errors we gave up and build the custom component with plain old JS instead. It works perfectly right out of the box.
