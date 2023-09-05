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
exports.SendConcurrentRequests = void 0;
const auxs_1 = require("./auxs");
const SendConcurrentRequests = (requests) => __awaiter(void 0, void 0, void 0, function* () {
    const MAX_RETRIES = 5;
    let retryCount = 0;
    let responded = [];
    while (retryCount < MAX_RETRIES) {
        try {
            const responses = yield Promise.all(requests);
            const retryIndexes = [];
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].status === auxs_1.TOO_MANY_REQUEST_STATUS_CODE)
                    retryIndexes.push(i);
                else
                    responded.push(responses[i]);
            }
            if (retryIndexes.length === 0)
                return responded;
            else {
                console.log("Waiting...");
                yield new Promise(resolve => setTimeout(resolve, auxs_1.TIMEOUT * Math.pow(2, retryCount)));
                requests = retryIndexes.map(index => requests[index]);
                retryCount++;
            }
        }
        catch (err) {
            console.error("Error in one or more requests. ", err);
            return [];
        }
    }
    console.log("Requests exeeds the max amount of retries.");
    return [];
});
exports.SendConcurrentRequests = SendConcurrentRequests;
