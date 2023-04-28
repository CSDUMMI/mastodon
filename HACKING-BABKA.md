## Versioning
All Mastodon Babka Versions follow the format:
```
v<Mastodon Version>-babka-<date of release in YYYY-MM-DD>
```
For every new version, a tag of the same name and an image in our Gitlab Container registry is created.

For example, when we upgraded to `v4.2.1` the first version was called `v4.2.1-babka-2023-04-19`, the corresponding tag is identical and the container image can be pulled from `registry.gitlab.com/babka_net/mastodon-babka:v4.2.1-2023-04-19`.

Mastodon +Babka uses GitLab CI/CD to build and publish any tag following the above format on the container registry.

## Uprading
1. Push changes to the `babka` branch
2. Create a tag following the format `v<Mastodon version>-babka-<YYYY-MM-DD>`
3. A CI job should start to build and publish a new image to the registry.
4. Add an entry to this changelog if the new version contains babka specific changes (i.e. is not just merging changes from upstream)
