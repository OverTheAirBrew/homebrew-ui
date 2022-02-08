"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
const path_1 = require("path");
Promise.resolve()
    .then(async () => {
    const response = await (0, isomorphic_unfetch_1.default)('http://localhost:9090/translations');
    const data = await response.json();
    for (const d of Object.keys(data.translations)) {
        const translationData = data.translations[d];
        await (0, fs_extra_1.outputFile)((0, path_1.join)(__dirname, '..', 'public', 'locales', `${d}.json`), JSON.stringify(translationData, null, 2), {});
    }
    await (0, fs_extra_1.outputFile)((0, path_1.join)(__dirname, 'locale-config.json'), JSON.stringify({
        locales: data.locales,
        namespaces: data.namespaces,
    }), {});
    process.exit(0);
})
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
