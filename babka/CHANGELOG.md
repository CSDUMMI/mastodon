# Babka Changelog
This Changelog only contains those changes made by Mastodon +Babka that were neither a part of Glitch nor Mastodon.

See [HACKING-BABKA](./HACKING-BABKA.md) for a description of versioning and how to upgrade Mastodon +Babka.
# v4.2.1-babka-2023-04-19
## Added
- Ladino locals ([ausir](https://meowr.me/@ausir))

# v4.0.2-babka-2023-01-28
## Fixed
- Single Logout at the identity provider when using OIDC.
- Redirecting back to the previous page after login.
# v4.0.2-babka-2022-11-28
## Added
- Replace the settings form to change email address and password in Mastodon settings by a link to `SSO_ACCOUNT_SETTINGS` if OMNIAUTH_ONLY is enabled.
- Add `SSO_HOST` environment variable to be used for the CSP policy to enable the "Login or Register" button.
# 2022-11-19
## Added
- "Login or Register" button to replace separate "Sign in" and "Sign up" button redirecting directly to the identity provider, when OMNIAUTH_ONLY is set to true.
## Removed
- hiredis library
