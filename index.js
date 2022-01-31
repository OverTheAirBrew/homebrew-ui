"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUi = void 0;
const next_1 = __importDefault(require("next"));
const path_1 = require("path");
function initUi(app) {
    const nextApp = next_1.default({
        dir: path_1.join(__dirname),
    });
    const handler = nextApp.getRequestHandler();
    app.all('*', (req, res) => {
        return handler(req, res);
    });
}
exports.initUi = initUi;
