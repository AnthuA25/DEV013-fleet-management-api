"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxis_1 = __importDefault(require("./taxis"));
const trajectories_1 = __importDefault(require("./trajectories"));
const router = express_1.default.Router();
// Agregar otros enrutadores aquí si es necesario
router.use('/', taxis_1.default);
router.use('/', trajectories_1.default);
// Exportar el enrutador principal
exports.default = router;
