"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const videosController_1 = require("../controllers/videosController");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.delete('/testing/all-data', videosController_1.removeAllDataController);
exports.videoRouter.get('/videos', videosController_1.getAllVideosController);
// videoRouter.post('/videos', getAllVideosController)
