"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterForSort = void 0;
const filterForSort = (sortBy, sortDirection) => {
    if (sortDirection === 'asc') {
        return { [sortBy]: 1 };
    }
    else {
        return { [sortBy]: -1 };
    }
};
exports.filterForSort = filterForSort;
