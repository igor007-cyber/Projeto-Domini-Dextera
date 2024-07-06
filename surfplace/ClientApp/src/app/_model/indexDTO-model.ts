import { BoardModel } from "./board-model-model";
import { Establishment } from './establishment-model';

export class IndexDTO {
    establishments: Establishment[] = [];
    promotions: BoardModel[] = [];
    boardModels: BoardModel[] = [];
}
