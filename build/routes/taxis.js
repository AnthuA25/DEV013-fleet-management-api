"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxis_1 = require("../controller/taxis");
const router = (0, express_1.Router)();
router.get('/taxis', taxis_1.getAllTaxis);
exports.default = router;
