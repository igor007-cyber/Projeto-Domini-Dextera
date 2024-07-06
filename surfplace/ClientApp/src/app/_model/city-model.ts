import { State } from "./state-model";

export class City {
    id: number;
    description: string;
    state: State;

    public constructor(init?: Partial<City>) {
        Object.assign(this, init);
    }
}
