import axios from 'axios'
import { Params } from './params';

export type AstralType = "polyanets" | "comeths" | "soloons";
export type ComethDirection = "up" | "down" | "right" | "left";
export type SoloonsColor = "blue" | "red" | "purple" | "white";

export type FloorCometh = "RIGHT_COMETH" | "UP_COMETH" | "LEFT_COMETH" | "DOWN_COMETH";
export type FloorSoloon = "BLUE_SOLOON" | "RED_SOLOON" | "PURPLE_SOLOON" | "WHITE_SOOLON";
export type Floor = "SPACE" | "POLYANET" | FloorCometh | FloorSoloon ;

export class Astral 
{
    // Attributes
    readonly url: string;
    readonly candidateId: string;
    readonly name: AstralType;

    constructor(
        url: string, 
        candidateId: string, 
        name: AstralType, 
    ) 
    {
        this.url = url
        this.candidateId = candidateId
        this.name = name;
    }

    // Methods
    async Post(
        row: number, 
        column: number, 
        color?: SoloonsColor, 
        direction?: ComethDirection
    ) 
    {
        const params = new Params(
            this.candidateId, 
            row,
            column, 
            color, 
            direction
        )
         try 
         {
            await axios.post(
                this.url + this.name, 
                params.GetJSON(), 
                Params.GetConfig()
            )
        } catch (err) 
        {
            console.log("ERROR: ", err)
        }
    }

    static GetAstralType(floor: Floor): AstralType | undefined
    {
        if (floor == "POLYANET") return "polyanets";
        if (floor.includes("SOLOON")) return "soloons";
        if (floor.includes("COMETH")) return "comeths";

        return undefined;
    }

    static GetAstralColor(floor: Floor): SoloonsColor | undefined
    {
        if (floor.includes("BLUE")) return "blue";
        if (floor.includes("RED")) return "red";
        if (floor.includes("PURPLE")) return "purple";
        if (floor.includes("WHITE")) return "white";

        return undefined;
    }

    static GetAstralDirection(floor: Floor): ComethDirection | undefined
    {
        if (floor.includes("RIGHT")) return "right";
        if (floor.includes("UP")) return "up";
        if (floor.includes("DOWN")) return "down";
        if (floor.includes("LEFT")) return "left";

        return undefined;
    }
}