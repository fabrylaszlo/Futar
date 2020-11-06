export default class Futar {
    private _egy: number;
    private _ketto: number;
    private _harom: number;
    public get egy(): number {
        return this._egy;
    }
    public get ketto(): number {
        return this._ketto;
    }
    public get harom(): number {
        return this._harom;
    }
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._egy = parseInt(m[0]);
        this._ketto = parseInt(m[1]);
        this._harom = parseInt(m[2]);
    }
}