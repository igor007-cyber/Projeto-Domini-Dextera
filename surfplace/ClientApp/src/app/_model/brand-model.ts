export class Brand {
    id: number;
    description: string;
    companyId: number;
    active: boolean;


    public constructor(init?: Partial<Brand>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Brand {
        return Object.assign(new Brand(), jsonData);
    }
}
