import Megoldás from "../Megoldás";

describe("megoldasOsztalyTesztelese", () => {
    const instance: Megoldás = new Megoldás();
    it("elsoFeladatTeszt", () => {
        expect(instance.hetielso).toBe(3);
    });
    it("masodikFeladatTeszt", async () => {
        expect(instance.hetiutolso.szamol).toBe(25);
    });
    it("harmadikFeladatTeszt", async () => {
        expect(instance.szabadnap).toBe("Kedd");
    });
    it("negyedikFeladatTeszt", async () => {
        expect(instance.Legtöbbfuvar).toBe("Vasárnap");
    });
});
