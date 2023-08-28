**This document maybe out-of-date by the time you are reading this. Especially confirm that no environment variables have changed or been added.**

**Last updated: 2023-08-28**
# Setting up a close-mirror of babka.social using docker-compose
The [`docker-compose.yml`](./docker-compose.yml), [`nginx.conf`](./nginx.conf) and [`.env.sso`](./.env.sso) files can be used to setup a mastodon instance to closely mirror the current setup of [babka.social](https://babka.social).

Currently babka.social runs a modified version of Mastodon +Glitch called Mastodon +Babka
and uses a separate keycloak instance as sole identity provider.

## Setup steps
1. Getting the Container Image
2. Setting up configuration
3. Starting a Keycloak server
4. Starting Mastodon

### Getting the Container Image
#### Using an image from `registry.gitlab.com/babka_net/mastodon-babka`
```bash
$ cd babka/setup
$ echo "MSTDN_TAG=v4.1.5-babka-2023-07-26" > .env
```
The `MSTDN_TAG` is the name of the tag of image in the container registry.
See [the container registry](https://gitlab.com/babka_net/mastodon-babka/container_registry) for a full list.

#### Building from source
After you have cloned the `mastodon-babka` repository on your server:
```bash
$ cp babka/setup/docker-compose.yml docker-compose.yml
$ cp babka/setup/nginx.conf nginx.conf
$ echo "MSTDN_TAG=local" > .env
$ docker compose build .
```

### Setting up configuration
See [the official documentation](https://docs.joinmastodon.org/admin/install/#generating-a-configuration) in case this document
becomes out-of-date.

To generate the `.env.production` file, precompile assets and create the db schema run:
```bash
$ touch .env.production
$ docker compose run --rm -e RAILS_ENV=production web bundle exec rake mastodon:setup
```
And follow the instructions provided by the script.
You do not need to create an admin user as under the configuration, it'll be impossible to login as such anyway.
Instead you'll want to create a user through keycloak and later on elevate them to admin by using `tootctl`.

**Remember to copy the provided .env.production file from stdout to the proper file.**

### Starting a Keycloak server
[`keycloak.docker-compose.yml`](./keycloak.docker-compose.yml) is the complete configuration needed to setup a development keycloak server. Remember to use the same Keycloak version as Babka to mirror babka.social as closely as possible.

Copy the `keycloak.docker-compose.yml` file to directory of your choice and then start the container:
```bash
$ docker compose up -d
```

This will expose keycloak on port `8080`. This keycloak configuration expects to be run behind a reverse proxy with HTTPS.
After setting up the reverse proxy, you should be able to login to the keycloak admin console using the credentials `admin@password` (which you should change as soon as possible).
Follow the instructions on setting up a realm next.

### Starting Mastodon
After you have set up Keycloak, created a realm and a client, the [`.env.sso`](./.env.sso) file needs to be modified accordingly.

To start the Mastodon server:
```bash
$ cp babka/setup/.env.sso .env.sso
$ nano .env.sso # adjust to your setup
$ docker compose up -d
```

Mastodon will run on port `8090` and expects to be run behind a reverse proxy.
Once configured with the reverse proxy, you should be able to access your new Mastodon instance.

