export class Category {
    id: number;
    description: string;
    companyId: number;
    active: boolean;


    public constructor(init?: Partial<Category>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Category {
        return Object.assign(new Category(), jsonData);
    }
}
