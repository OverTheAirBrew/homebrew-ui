"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
Promise.resolve()
    .then(async () => {
    await (0, fs_extra_1.outputFile)((0, path_1.join)(__dirname, '..', 'public', 'locales', 'en/common.json'), JSON.stringify({}));
    await (0, fs_extra_1.outputFile)((0, path_1.join)(__dirname, '..', 'locale-config.json'), JSON.stringify({
        locales: ['en'],
        namespaces: ['common'],
    }));
    process.exit(0);
})
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
