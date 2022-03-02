import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
import { ActorsPage } from '../page_objects/actors-page';
import { Modal } from '../page_objects/shared/modal';
import { pathToUrl } from '../support/urls';

Given('A user is on the actors page', async (t) => {
  await t.navigateTo(pathToUrl('/equipment/actors'));
});

When('they add a gpio actor', async (t) => {
  const actorName = uuid();
  t.ctx.actorName = actorName;

  await t
    .click(ActorsPage.addActorButton)
    .typeText(Modal.name, actorName)
    .click(Modal.type)
    .click(ActorsPage.modal.gpio.typeSelector)
    .click(ActorsPage.modal.gpio.gpioNumber)
    .click(ActorsPage.modal.gpio.gpioNumberValue)
    .click(Modal.submit);
});

Then('the actor is added to the list of actors', async (t) => {
  const { actorName } = t.ctx;

  expect(await ActorsPage.actorRow(actorName).visible).to.be.true;
});
