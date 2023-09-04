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
exports.Astral = void 0;
const axios_1 = __importDefault(require("axios"));
const params_1 = require("./params");
class Astral {
    constructor(url, candidateId, name) {
        this.url = url;
        this.candidateId = candidateId;
        this.name = name;
    }
    // Methods
    Post(row, column, color, direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new params_1.Params(this.candidateId, row, column, color, direction);
            try {
                yield axios_1.default.post(this.url + this.name, params.GetJSON(), params_1.Params.GetConfig());
            }
            catch (err) {
                console.log("ERROR: ", err);
            }
        });
    }
    static GetAstralType(floor) {
        if (floor == "POLYANET")
            return "polyanets";
        if (floor.includes("SOLOON"))
            return "soloons";
        if (floor.includes("COMETH"))
            return "comeths";
        return undefined;
    }
    static GetAstralColor(floor) {
        if (floor.includes("BLUE"))
            return "blue";
        if (floor.includes("RED"))
            return "red";
        if (floor.includes("PURPLE"))
            return "purple";
        if (floor.includes("WHITE"))
            return "white";
        return undefined;
    }
    static GetAstralDirection(floor) {
        if (floor.includes("RIGHT"))
            return "right";
        if (floor.includes("UP"))
            return "up";
        if (floor.includes("DOWN"))
            return "down";
        if (floor.includes("LEFT"))
            return "left";
        return undefined;
    }
}
exports.Astral = Astral;
