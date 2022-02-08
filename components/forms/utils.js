"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = exports.isRequiredMessage = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
function isRequiredMessage(t, property, namespace) {
    return t('interpolation.is-required', {
        name: t(property, { ns: namespace }),
    });
}
exports.isRequiredMessage = isRequiredMessage;
exports.ErrorMessage = styled_components_1.default.div `
  color: red;
  font-size: 10px;
  padding: 0;
`;
