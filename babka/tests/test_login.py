from .fixtures import driver
from .helpers import go_to_keycloak_from_mastodon, login_to_keycloak
from selenium.webdriver.common.by import By
import os

INSTANCE_URI = os.environ["INSTANCE_URI"]
SSO_URI = os.environ["SSO_URI"]

def test_login(driver):
  driver.get(INSTANCE_URI)

  go_to_keycloak_from_mastodon(driver, SSO_URI)

  login_to_keycloak(driver, INSTANCE_URI)


