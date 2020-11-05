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

    public get hetiutolso(): any {
        let szamol: number = 0;
        let max: number = 0;
        let hetinap: number = 0;
        this.Tavok.forEach(i => {
            if (i.egy != hetinap) {
                if (i.ketto >= max && i.egy >= hetinap) {
                    hetinap = i.egy;
                    szamol = i.harom;
                    max = i.ketto;
                }
            }
        });
        return { szamol, max };
    }
    public get szabadnap(): any {
        let egy: boolean = false;
        let ketto: boolean = false;
        let harom: boolean = false;
        let negy: boolean = false;
        let ot: boolean = false;
        let hat: boolean = false;
        let het: boolean = false;
        this.Tavok.forEach(element => {
            if (element.egy == 1) {
                egy = true;
            }
            if (element.egy == 2) {
                ketto = true;
            }
            if (element.egy == 3) {
                harom = true;
            }
            if (element.egy == 4) {
                negy = true;
            }
            if (element.egy == 5) {
                ot = true;
            }
            if (element.egy == 6) {
                hat = true;
            }
            if (element.egy == 7) {
                het = true;
            }
        });
        if (egy == false) {
            return "Hétfőn nem dolgozott";
        }
        if (ketto == false) {
            return "Kedden nem dolgozott";
        }
        if (harom == false) {
            return "Szerdán nem dolgozott";
        }
        if (negy == false) {
            return "Csütörtökön nem dolgozott";
        }
        if (ot == false) {
            return "Pénteken nem dolgozott";
        }
        if (hat == false) {
            return "Szombaton nem dolgozott";
        }
        if (het == false) {
            return "Vasárnap nem dolgozott";
        }
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
