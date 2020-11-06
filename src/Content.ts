import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
     
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Futár</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");       
        const params = url.parse(req.url as string, true).query;

        const megold = new Megoldás;
        res.write(`<p>1.nap 1.fuvar: ${megold.hetielso}km</p>`);
        res.write(`<p>A hét utolsó fuvara: ${megold.hetiutolso.szamol}km</p>`);
        res.write(`<p>${megold.szabadnap}-i napon nem dolgozott</p>`);
        res.write(`<p>A legtöbb fuvar ${megold.Legtöbbfuvar}-i napon történt</p>`);
        res.write(`7.feladat:\n`);
        res.write(`<input type="number" name="ertek" placeholder="1-30" OnChange="this.form.submit()" value="${params.ertek}" />\n`);

        let beertek: string = params.ertek as string;
        if(megold.input(beertek)!=undefined){
            res.write(`<p>${megold.input(beertek)}Ft</p>\n\n`);
        }
        megold.tekerés.forEach(x => {
            res.write(`<p>${x}</p>`);
        });
        res.write(`8.feladat a fájlbaírás megtörtént! Tartalma:`);
        megold.dijazas.forEach(x => {
            res.write(`<p>${x}</p>`);
        });
        res.write(`<p>9.feladat ${megold.fiezetes} Ft volt a heti fizetése</p>`);
       
        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
