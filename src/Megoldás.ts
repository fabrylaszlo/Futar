import fs from "fs";
import Futar from "./Futar";

export default class Megoldás {
    private Tavok: Futar[] = [];

    public get hetielso(): number {
        let szamol: number = 0;
        let megájj: boolean = true;
        this.Tavok.forEach(i => {
            if (i.egy == 1 && i.ketto == 1 && megájj == true) {
                szamol += i.harom;
                megájj = false;
            }
        });
        return szamol;
    }
    public get hetiutolso(): number {
        let szamol: number = 0;
        let max: number = 0;
        this.Tavok.forEach(i => {
            if (i.ketto > max) {
                szamol = i.harom;
                max = i.ketto;
            }
        });
        return szamol;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this.Tavok.push(new Futar(aktSor));
            });
    }
}
