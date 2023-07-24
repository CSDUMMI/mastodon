from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import random
import string
import os

def random_string():
  return ''.join(random.choice(string.ascii_lowercase) for i in range(10))

def go_to_keycloak_from_mastodon(driver, sso_uri):
  login_or_register_button = driver.find_element(By.LINK_TEXT, "Login or Register")
  login_or_register_button.click()

  print(driver.current_url)
  assert driver.current_url.startswith(sso_uri)


def login_to_keycloak(driver, instance_uri):
  username_field = driver.find_element(By.ID, "username")
  password_field = driver.find_element(By.ID, "password")
  login_button = driver.find_element(By.ID, "kc-login")

  username_field.send_keys(os.environ["USERNAME"])
  password_field.send_keys(os.environ["PASSWORD"])
  login_button.click()

  current_url = driver.current_url
  assert current_url.startswith(instance_uri)


def logout_from_mastodon(driver, instance_uri, sso_uri):
  driver.get(f"{instance_uri}/settings/profile")
  logout_button = driver.find_element(By.LINK_TEXT, "Logout")
  logout_button.click()

  assert driver.current_url.startswith(sso_uri)


def register_on_keycloak(driver, instance_uri, sso_uri):
  go_to_keycloak_from_mastodon(driver, sso_uri)

  register_button = driver.find_element(By.LINK_TEXT, "Register")
  register_button.click()

  username = random_string()
  password = random_string()
  email = f"{random_string()}@{random_string()}.com"

  driver.find_element(By.ID, "username").send_keys(username)
  driver.find_element(By.ID, "password").send_keys(password)
  driver.find_element(By.ID, "password-confirm").send_keys(password)
  driver.find_element(By.ID, "email").send_keys(email)
  driver.find_element(By.ID, "kc-form-buttons").find_element(By.TAG_NAME, "input").click()

  assert driver.current_url.startswith(instance_uri)
  assert driver.find_element(By.LINK_TEXT, "Home")
  assert driver.find_element(By.LINK_TEXT, "Notifications")
  assert driver.find_element(By.LINK_TEXT, "Preferences")

