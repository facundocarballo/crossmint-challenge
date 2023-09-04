import axios from "axios";
import { CANDIDATE_ID, URL } from "./crossmint";
import { Params } from "./classes/params";
import { Astral, Floor } from "./classes/astral";

const GOAL = "goal";
const TIME_OUT = 1000;

const polyanet = new Astral(URL, CANDIDATE_ID, "polyanets");
const soloon = new Astral(URL, CANDIDATE_ID, "soloons");
const cometh = new Astral(URL, CANDIDATE_ID, "comeths");

let row = 0;
let column = 0;

const main = async () => 
{
    const res = await axios.get(URL + "map/" + CANDIDATE_ID + "/goal", Params.GetConfig());
    const map: Floor[][] = res.data[GOAL];

    const handlePostRequest = async () => {
        switch (Astral.GetAstralType(map[row][column])) 
        {
            case "comeths":
                await cometh.Post(
                    row,
                    column,
                    undefined,
                    Astral.GetAstralDirection(map[row][column])
                );
                break;
            case "polyanets":
                await polyanet.Post(row, column);
                break;
            case "soloons":
                await soloon.Post(
                    row, 
                    column, 
                    Astral.GetAstralColor(map[row][column])
                );
                break;
            default:
                break;
        }
        column++;
        if (column >= map[row].length) {
            column = 0;
            row++;
            if (row >= map.length) {
                clearInterval(interval);
            }
        }
    }

    handlePostRequest()
    
    const interval = setInterval(handlePostRequest, TIME_OUT)
};



main()