### Testing
This folder contains a set of automatic integration tests for a running Mastodon +Babka instance.

These flows are currently tested by the tests:
- login
- logout

#### How to run tests
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

