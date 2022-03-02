import { Selector } from 'testcafe';

export const ActorsPage = {
  addActorButton: Selector("[data-testing='add-create-actor']"),
  modal: {
    gpio: {
      typeSelector: Selector("[data-testing=select-box-option-gpio-actor']"),
      gpioNumber: Selector("[data-testing=select-box-gpioNumber']"),
      gpioNumberValue: Selector("[data-testing=select-box-option-15']"),
    },
  },
  actorRow: (name: string) => Selector(`[data-testing='actor-${name}']`),
};
