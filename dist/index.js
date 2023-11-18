"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const setting_1 = require("./setting");
const PORT = 3001;
exports.db = {
    users: [
        { id: 1, name: 'Dima', age: '29' },
        { id: 2, name: 'Vasa', age: '22' },
        { id: 3, name: 'Petya', age: '23' },
    ]
};
setting_1.app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
