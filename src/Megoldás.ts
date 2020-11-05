import { AsyncLocalStorage } from "async_hooks";
import fs from "fs";
import { resolve } from "path";
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
    public melyiknap(be: number): any {
        switch (be) {
            case 1:
                return "Hétfő";
                break;
            case 2:
                return "Kedd";
                break;
            case 3:
                return "Szerda";
                break;
            case 4:
                return "Csütörtök";
                break;
            case 5:
                return "Péntek";
                break;
            case 6:
                return "Szombat";
                break;
            case 7:
                return "Vasárnap";
                break;
        }
    }
    public get szabadnap(): any {
        let igaze: boolean = false;

        for (let i = 1; i < 8; i++) {
            this.Tavok.forEach(element => {
                if (i == element.egy) {
                    igaze = true;
                }
            });
            if (igaze == false) {
                return this.melyiknap(i);
                break;
            }
            igaze = false;
        }
    }
    public get Legtöbbfuvar(): any {
        let mennyi: number = 0;
        let max: number = 0;
        let melyiknap: number = 0;
        for (let i = 0; i < 8; i++) {
            this.Tavok.forEach(element => {
                if (element.egy == i) {
                    mennyi += element.ketto;
                    melyiknap = element.egy;
                }
            });
            if (mennyi > max) {
                max = mennyi;
                melyiknap = i;
            }
        }
        return this.melyiknap(melyiknap);
    }
    public get tekerés(): any[] {
        let mennyi: number = 0;
        let tömb: string[] = [];
        for (let i = 1; i < 8; i++) {
            this.Tavok.forEach(element => {
                if (element.egy == i) {
                    mennyi += element.harom;
                }
            });
            if (mennyi != 0) {
                tömb[i] = i + ". nap:" + mennyi + " km" + "\n";
            }

            mennyi = 0;
        }
        return tömb;
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
