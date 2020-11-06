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
    public melyiknap(be: number): any {
        let tömb: string[] = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
        return tömb[be - 1];
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
    public input(bekert: string): any {
        let szam: number = parseInt(bekert)
        if (szam >= 1 && szam <= 2) {
            return 500;
        }
        if (szam >= 3 && szam <= 5) {
            return 700;
        }
        if (szam >= 6 && szam <= 10) {
            return 900;
        }
        if (szam >= 11 && szam <= 20) {
            return 1400;
        }
        if (szam >= 21 && szam <= 30) {
            return 2000;
        }
    }
    public get dijazas(): any[] {
        this.Tavok.sort();
        let tömb: string[] = [];
        this.Tavok.forEach(element => {
            tömb.push(element.egy + ". nap " + element.ketto + ". út:" + this.input(element.harom.toString()) + "Ft");
        });
        tömb.sort();
        let stribg: string = "";
        tömb.forEach(element => {
            stribg += element + "\n";
        });
        fs.writeFileSync('dijazas.txt', stribg)
        return tömb;
    }
    public get fiezetes(): any {
        let fiezetesosszeg: number = 0;
        this.Tavok.forEach(element => {
            fiezetesosszeg += this.input(element.harom.toString());
        });
        return fiezetesosszeg;
    }

    constructor() {
        fs.readFileSync("tavok.txt")
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                this.Tavok.push(new Futar(aktSor));
            });
    }
}
