from .fixtures import driver
from .helpers import go_to_keycloak_from_mastodon, login_to_keycloak, logout_from_mastodon
from selenium.webdriver.common.by import By
import os

INSTANCE_URI = os.environ["INSTANCE_URI"]
SSO_URI = os.environ["SSO_URI"]

def test_logout(driver):
  driver.get(INSTANCE_URI)

  go_to_keycloak_from_mastodon(driver, SSO_URI)

  login_to_keycloak(driver, INSTANCE_URI)

  logout_from_mastodon(driver, INSTANCE_URI, SSO_URI)

