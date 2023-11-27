## Versioning
All Mastodon Babka Versions follow the format:
```
v<Mastodon Version>-babka-<date of release in YYYY-MM-DD>
```
For every new version, a tag of the same name and an image in our Gitlab Container registry is created.

For example, when we upgraded to `v4.2.1` the first version was called `v4.2.1-babka-2023-04-19`, the corresponding tag is identical and the container image can be pulled from `registry.gitlab.com/babka_net/mastodon-babka:v4.2.1-2023-04-19`.

Mastodon +Babka uses GitLab CI/CD to build and publish any tag following the above format on the container registry.

## Updating from upstream
Mastodon +Babka is based on [Mastodon +Glitch](https://glitch-soc.github.io/docs), which forks directly from Mastodon.

Glitch is not versioned and under active development.

As Mastodon +Babka is versioned (see below), we only pull changes from glitch upon a release of [Mastodon](https://github.com/mastodon/mastodon/releases). This should be done very quickly after a release was made, as otherwise unstable bugs might be introduced into Mastodon +Babka requiring repeated pulls from upstream between releases.

### Setting up glitch-soc remote
To perform an update from upstream, you'll first need to setup a remote in your git repository pointing to glitch-soc (our upstream repository):

```
$ git remote add glitch-soc https://github.com/glitch-soc/mastodon.git
$ git fetch glitch-soc
$ git checkout babka
$ git pull
$ git fetch glitch-soc
```

### Updating by merge
The fastest method to update from upstream is using a merge:
```
$ git merge glitch-soc/main
```

There will be a few merge conflicts relating to features added by Mastodon +Babka.
Unless a feature of Mastodon +Babka has recently been merged into Mastodon (or Glitch), you should pick Mastodon +Babka's changes when in doubt.

If you get lost, `git status` and `meld` are your friend.

### Updating by rebase
An alternative, but slower method of updating Mastodon +Babka is using a rebase:

```
$ git rebase glitch-soc/main
```
The disadvantage here is (besides the wider debate about rebase v. merge) is that it will take longer as rebase goes through the past commit history and prompts you to solve conflicts in each, while merge will only prompt you with these once.


### Dealing with conflicts in Gemfile.lock
Often these conflicts occur because of some updated dependency. It is advised to always either keep the old or new version of this file and not to mix them.

**After an update: Follow the upgrade procedure (below) with the new mastodon version.**

## Uprading
1. Push changes to the `babka` branch
2. Create a tag following the format `v<Mastodon version>-babka-<YYYY-MM-DD>`
3. A CI job should start to build and publish a new image to the registry.
4. Add an entry to this changelog if the new version contains babka specific changes (i.e. is not just merging changes from upstream)
5. Deploy to a staging instance and run the integration tests

## Testing
This folder contains a set of automatic integration tests for a running Mastodon +Babka instance.

These flows are currently tested by the tests:
- login
- logout

### How to run tests
The tests expect these environment variables to be set:
```env
INSTANCE_URI=<mastodon uri>
SSO_URI=<keycloak uri>
USERNAME=<username of an existing test account>
PASSWORD=<password of test account>
```

To run the tests, simply run:
```bash
$ poetry run pytest
```

