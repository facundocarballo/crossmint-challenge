import { Astral } from "./classes/astral";
import { URL, CANDIDATE_ID } from "./src/crossmint";

const MATRIX_SIZE = 11;
const MARGIN = 2;

const main = async () => 
{

    const polyanet = new Astral(URL, CANDIDATE_ID, "polyanets")
    
    for (let i = MARGIN; i < MATRIX_SIZE-MARGIN; i++) 
    {
        await polyanet.Post(i, i)
        await polyanet.Post(i, MATRIX_SIZE - 1 - i)
    }
}

main()