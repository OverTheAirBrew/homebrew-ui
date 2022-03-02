import { Selector } from 'testcafe';

export const SensorPage = {
  addSensorButton: Selector("[data-testing='add-create-sensor']"),
  modal: {
    onewire: {
      typeSelector: Selector(
        "[data-testing='select-box-option-one-wire-sensor']",
      ),
      sensorAddress: Selector("[data-testing='select-box-sensorAddress']"),
      sensorAddressValue: Selector(
        "[data-testing='select-box-option-28-000004c8b8d3']",
      ),
    },
  },
  sensorRow: (name: string) => Selector(`[data-testing='sensor-${name}']`),
};
