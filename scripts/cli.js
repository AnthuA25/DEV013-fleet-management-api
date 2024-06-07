"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// node upload-gps-data.js <path-to-files>
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>
var fs = require("fs");
var client_1 = require("@prisma/client");
var path = require("path");
// import inquirer from 'inquirer';
function createModel() {
    return __awaiter(this, void 0, void 0, function () {
        var prisma, args, folderPath, type, _i, args_1, arg, folderToProcess, files, _a, files_1, file, filePath, readFiles, lines, _b, lines_1, line, _c, field1, field2, field3, field4, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    prisma = new client_1.PrismaClient();
                    console.log("process", process.argv);
                    args = process.argv.slice(2);
                    console.log("🚀 ~ createModel ~ args:", args);
                    folderPath = undefined;
                    type = undefined;
                    for (_i = 0, args_1 = args; _i < args_1.length; _i++) {
                        arg = args_1[_i];
                        if (arg.startsWith('--type=')) {
                            type = arg.split('=')[1]; // Extraer solo el valor del tipo
                        }
                        else {
                            folderPath = arg;
                        }
                    }
                    if (folderPath === undefined || type === undefined) {
                        console.error("Missing folder path or type argument.");
                        return [2 /*return*/];
                    }
                    folderToProcess = path.join(folderPath, type);
                    console.log("🚀 ~ createModel ~ folderToProcess:", folderToProcess);
                    files = fs.readdirSync(folderToProcess);
                    console.log("🚀 ~ createModel ~ files:", files);
                    _a = 0, files_1 = files;
                    _d.label = 1;
                case 1:
                    if (!(_a < files_1.length)) return [3 /*break*/, 11];
                    file = files_1[_a];
                    console.log("🚀 ~ createModel ~ file:", file);
                    if (!file.endsWith('.txt')) {
                        return [3 /*break*/, 10];
                    }
                    filePath = path.join(folderToProcess, file);
                    console.log("🚀 ~ createModel ~ filePath:", filePath);
                    readFiles = fs.readFileSync(filePath, 'utf-8');
                    lines = readFiles.split('\n').map(function (line) { return line.trim(); }).filter(Boolean);
                    _b = 0, lines_1 = lines;
                    _d.label = 2;
                case 2:
                    if (!(_b < lines_1.length)) return [3 /*break*/, 10];
                    line = lines_1[_b];
                    _c = line.split(','), field1 = _c[0], field2 = _c[1], field3 = _c[2], field4 = _c[3];
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 8, , 9]);
                    if (!(type === 'taxis')) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.taxis.createMany({
                            data: {
                                id: parseInt(field1),
                                plate: field2
                            },
                        })];
                case 4:
                    _d.sent();
                    return [3 /*break*/, 7];
                case 5:
                    if (!(type === 'trajectories')) return [3 /*break*/, 7];
                    return [4 /*yield*/, prisma.trajectories.createMany({
                            data: {
                                taxiId: parseInt(field1),
                                date: new Date(field2),
                                latitude: parseFloat(field3),
                                longitude: parseFloat(field4)
                            },
                        })];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _d.sent();
                    console.error(error_1);
                    return [3 /*break*/, 9];
                case 9:
                    _b++;
                    return [3 /*break*/, 2];
                case 10:
                    _a++;
                    return [3 /*break*/, 1];
                case 11:
                    console.log("All lines processed successfully.");
                    return [2 /*return*/];
            }
        });
    });
}
createModel();
