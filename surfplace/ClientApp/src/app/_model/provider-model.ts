export class Provider {
    id: number;
    description: string;
    companyId: number;
    active: boolean;


    public constructor(init?: Partial<Provider>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Provider {
        return Object.assign(new Provider(), jsonData);
    }
}
