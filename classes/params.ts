import { ComethDirection, SoloonsColor } from "./astral";
import { AxiosRequestConfig } from 'axios'

export class Params 
{
    candidateId: string;
    row: number;
    column: number;
    color?: SoloonsColor;
    direction?: ComethDirection;

    constructor(
        candidateId: string,
        row: number, 
        column: number, 
        color?: SoloonsColor, 
        direction?: ComethDirection) 
    {
        this.candidateId = candidateId;
        this.row = row;
        this.column = column;

        if (color !== undefined) 
        {
            this.color = color;
        }

        if (direction !== undefined) 
        {
            this.direction = direction;
        }
    }

    GetJSON():string {
        return JSON.stringify(this)
    }

    static GetConfig():AxiosRequestConfig<string | undefined> {
        return {
            headers: 
            {
                "Content-Type": "application/json"
            }
        }
    }
}