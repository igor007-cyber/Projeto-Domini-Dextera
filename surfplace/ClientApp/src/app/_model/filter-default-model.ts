import { ApplicationUser } from './application-user';

export class FilterDefaultModel {
    name: string;
    description: string;
    id: number;
    userName: string;
    establishmentId: number;
    sizePage: number;
    public constructor(init?: Partial<FilterDefaultModel>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): FilterDefaultModel {
        return Object.assign(new FilterDefaultModel(), jsonData);
    }
}
