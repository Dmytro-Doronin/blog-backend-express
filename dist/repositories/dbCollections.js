"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbPostCollections = exports.dbBlogCollections = void 0;
const db_1 = require("../db/db");
exports.dbBlogCollections = db_1.client.db('Blogs').collection('blogs');
exports.dbPostCollections = db_1.client.db('Blogs').collection('posts');
