from selenium import webdriver
import pytest

@pytest.fixture
def driver():
  driver = webdriver.Firefox()
  driver.implicitly_wait(0.5)
  yield driver
  driver.quit()
