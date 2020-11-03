import fs from "fs";
export default abstract class Futar {
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                const aktTípus: string = aktSor.split(" ")[3];
                if (aktTípus === "JGY") {
                    this._utasadatok.push(new FelszállásJegy(aktSor));
                } else if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(aktTípus)) {
                    this._utasadatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}
