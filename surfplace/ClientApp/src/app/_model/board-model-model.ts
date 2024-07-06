import { BoardModelBottom } from "./board-model-bottom-model";
import { BoardModelConstruction } from "./board-model-construction-model";
import { BoardModelDimensions } from "./board-model-dimensions-model";
import { BoardModelFinSystem } from "./board-model-fin-system-model";
import { BoardModelFinishing } from "./board-model-finishing-model";
import { BoardModelLamination } from "./board-model-lamination-model";
import { BoardModelStringer } from "./board-model-stringer-model";
import { BoardModelTail } from "./board-model-tail-model";
import { BoardModelTailReinforcement } from "./board-model-tail-reinforcement-model";
import { BoardType } from "./board-type-model";
import { Establishment } from './establishment-model';

export class BoardModel {
    description: string;
    name: string;
    urlMovie: string;
    id: number;
    boardTypeId: number;
    daysProduction: number;
    value: number;
    establishmentId: number;
    imageName: string;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;
    promotionalValue?: number;
    promotion: boolean;
    highlights: boolean;
    boardModelDimensions: BoardModelDimensions[] = [];
    boardModelBottoms: BoardModelBottom[] = [];
    boardModelConstructions: BoardModelConstruction[] = [];
    boardModelFinishings: BoardModelFinishing[] = [];
    boardModelLaminations: BoardModelLamination[] = [];
    boardModelTails: BoardModelTail[] = [];
    boardModelTailReinforcements: BoardModelTailReinforcement[] = [];
    boardModelStringers: BoardModelStringer[] = [];
    boardModelFinSystems: BoardModelFinSystem[] = [];
    boardType: BoardType;
    establishment: Establishment;

    public constructor(init?: Partial<BoardModel>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): BoardModel {
        return Object.assign(new BoardModel(), jsonData);
    }
}
