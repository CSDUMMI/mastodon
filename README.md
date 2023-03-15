#  Mastodon +Babka
Mastodon +Babka is a fork of Mastodon +Glitch that runs on the [`babka.social`](https://babka.social) instance.

`babka.social` uses an identity provider to manage user accounts and credentials and connects them with Mastodon through the OpenID Connect protocol. We have made a lot of changes to remove bugs with the OpenID Connect integration of Mastodon.

`babka.social` is deployed on Kubernetes. We continue making changes to Mastodon to deploy it on kubernetes more easily.

## Changes
- `Login or Register` button. Instead of going through a dialog at `/auth/sign_in` users of Mastodon are directly taken to the identity provider upon clicking this button in the Mastodon Web UI. The `Login or Register` button replaces the previous `Sign in` and `Sign Up` buttons in the Web UI.
- Removal of `hiredis` dependency
-  

## Changes that were merged upstream
