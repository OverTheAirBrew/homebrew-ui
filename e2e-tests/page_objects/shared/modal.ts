import { Selector } from 'testcafe';

export const Modal = {
  submit: Selector("[data-testing='modal-submit']"),
  name: Selector("[data-testing='modal-name']"),
  type: Selector("[data-testing='modal-type']"),
};
