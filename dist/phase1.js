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
Object.defineProperty(exports, "__esModule", { value: true });
const astral_1 = require("./classes/astral");
const crossmint_1 = require("./src/crossmint");
const MATRIX_SIZE = 11;
const MARGIN = 2;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const polyanet = new astral_1.Astral(crossmint_1.URL, crossmint_1.CANDIDATE_ID, "polyanets");
    for (let i = MARGIN; i < MATRIX_SIZE - MARGIN; i++) {
        yield polyanet.Post(i, i);
        yield polyanet.Post(i, MATRIX_SIZE - 1 - i);
    }
});
main();
