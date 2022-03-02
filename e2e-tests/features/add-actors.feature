Feature: Adding an Actor
  Allow adding an actor to the brewery.

  Scenario: A gpio actor can be added
    Given A user is on the actors page
    When they add a gpio actor
    Then the actor is added to the list of actors