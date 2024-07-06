import { Finishing } from "./finishing-model";

export class BoardModelFinishing {
    id: number;
    boardModelId: number;
    finishingId: number;
    finishing: Finishing = new Finishing();
}
