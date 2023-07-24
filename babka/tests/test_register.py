from .fixtures import driver
from .helpers import register_on_keycloak
from selenium.webdriver.common.by import By
import os

INSTANCE_URI = os.environ["INSTANCE_URI"]
SSO_URI = os.environ["SSO_URI"]

def test_register(driver):
  driver.get(INSTANCE_URI)

  register_on_keycloak(driver, INSTANCE_URI, SSO_URI)

