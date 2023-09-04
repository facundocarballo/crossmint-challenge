"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
class Params {
    constructor(candidateId, row, column, color, direction) {
        this.candidateId = candidateId;
        this.row = row;
        this.column = column;
        if (color !== undefined) {
            this.color = color;
        }
        if (direction !== undefined) {
            this.direction = direction;
        }
    }
    GetJSON() {
        return JSON.stringify(this);
    }
    GetConfig() {
        return {
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
}
exports.Params = Params;
