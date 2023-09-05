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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const crossmint_1 = require("./src/crossmint");
const params_1 = require("./classes/params");
const astral_1 = require("./classes/astral");
const GOAL = "goal";
const TIME_OUT = 1000;
const polyanet = new astral_1.Astral(crossmint_1.URL, crossmint_1.CANDIDATE_ID, "polyanets");
const soloon = new astral_1.Astral(crossmint_1.URL, crossmint_1.CANDIDATE_ID, "soloons");
const cometh = new astral_1.Astral(crossmint_1.URL, crossmint_1.CANDIDATE_ID, "comeths");
let row = 0;
let column = 0;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(crossmint_1.URL + "map/" + crossmint_1.CANDIDATE_ID + "/goal", params_1.Params.GetConfig());
    const map = res.data[GOAL];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            switch (astral_1.Astral.GetAstralType(map[i][j])) {
                case "comeths":
                    yield cometh.Post(i, j, undefined, astral_1.Astral.GetAstralDirection(map[i][j]));
                    break;
                case "polyanets":
                    yield polyanet.Post(i, j);
                    break;
                case "soloons":
                    yield soloon.Post(i, j, astral_1.Astral.GetAstralColor(map[i][j]));
                    break;
                default:
                    break;
            }
        }
    }
});
main();
