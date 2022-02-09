"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
Promise.resolve()
    .then(async () => {
    await (0, fs_extra_1.outputFile)((0, path_1.join)(__dirname, '..', 'public', 'locales', 'en/common.json'), JSON.stringify({}));
    process.exit(0);
})
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
