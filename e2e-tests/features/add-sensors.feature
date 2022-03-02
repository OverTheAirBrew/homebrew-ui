Feature: Adding A Sensor
  Allow adding a sensor to the brewery.

  Scenario: A one wire sensor can be added
    Given A user is on the sensors page
    When they add a one-wire sensor
    Then the sensor is added to the list of sensors