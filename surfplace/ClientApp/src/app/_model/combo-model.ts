import { ComboBoardModel } from "./combo-board-model-model";
import { ComboProduct } from "./combo-product-model";

export class Combo {
    description: string;
    id: number;
    value: number;
    establishmentId: number;
    imageName: string;
    comboProduct: ComboProduct[] = [];
    comboBoardModel: ComboBoardModel[] = [];


    public constructor(init?: Partial<Combo>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Combo {
        return Object.assign(new Combo(), jsonData);
    }
}
