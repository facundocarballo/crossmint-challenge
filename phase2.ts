import axios from "axios";
import { CANDIDATE_ID, URL } from "./src/crossmint";
import { Params } from "./classes/params";
import { Astral, Floor } from "./classes/astral";

const GOAL = "goal";

const polyanet = new Astral(URL, CANDIDATE_ID, "polyanets");
const soloon = new Astral(URL, CANDIDATE_ID, "soloons");
const cometh = new Astral(URL, CANDIDATE_ID, "comeths");

const main = async () => 
{
    const res = await axios.get(URL + "map/" + CANDIDATE_ID + "/" + GOAL, Params.GetConfig());
    const map: Floor[][] = res.data[GOAL];

    for (let i = 0; i < map.length; i++) 
    {
        for (let j = 0; j < map[i].length; j++) 
        {
            switch (Astral.GetAstralType(map[i][j])) 
            {
                case "comeths":
                    await cometh.Post(
                        i,
                        j,
                        undefined,
                        Astral.GetAstralDirection(map[i][j])
                    );
                    break;
                case "polyanets":
                    await polyanet.Post(i, j);
                    break;
                case "soloons":
                    await soloon.Post(
                        i, 
                        j, 
                        Astral.GetAstralColor(map[i][j])
                    );
                    break;
                default:
                    break;
            }
        }
    }
};



main()