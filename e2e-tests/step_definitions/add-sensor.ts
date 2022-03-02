import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
import { SensorPage } from '../page_objects/sensor-page';
import { Modal } from '../page_objects/shared/modal';
import { pathToUrl } from '../support/urls';

Given('A user is on the sensors page', async (t) => {
  await t.navigateTo(pathToUrl('/equipment/sensors'));
});

When('they add a one-wire sensor', async (t) => {
  const sensorName = uuid();
  t.ctx.sensorName = sensorName;

  await t
    .click(SensorPage.addSensorButton)
    .typeText(Modal.name, sensorName)
    .click(Modal.type)
    .click(SensorPage.modal.onewire.typeSelector)
    .click(SensorPage.modal.onewire.sensorAddress)
    .click(SensorPage.modal.onewire.sensorAddressValue)
    .click(Modal.submit);
});

Then('the sensor is added to the list of sensors', async (t) => {
  const { sensorName } = t.ctx;

  expect(await SensorPage.sensorRow(sensorName).visible).to.be.true;
});
