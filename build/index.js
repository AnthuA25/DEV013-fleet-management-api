"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxis_1 = __importDefault(require("./routes/taxis"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hello world!');
// });
app.use('/taxis', taxis_1.default);
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
