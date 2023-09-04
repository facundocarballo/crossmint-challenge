import axios from 'axios'
import { Params } from './params';

export type AstralType = "polyanets" | "comeths" | "soloons";
export type ComethDirection = "up" | "down" | "right" | "left";
export type SoloonsColor = "blue" | "red" | "purple" | "white";

export class Astral 
{
    // Attributes
    readonly url: string;
    readonly candidateId: string;
    readonly name: AstralType;

    constructor(url: string, candidateId: string, name: AstralType) 
    {
        this.url = url
        this.candidateId = candidateId
        this.name = name;
    }

    // Methods
    async Post(row:number, column: number) 
    {
        const params = new Params(this.candidateId, row, column)
         try 
         {
            await axios.post(
                this.url + this.name, 
                params.GetJSON(), 
                params.GetConfig()
            )
        } catch (err) 
        {
            console.log("ERROR: ", err)
        }
    }

}