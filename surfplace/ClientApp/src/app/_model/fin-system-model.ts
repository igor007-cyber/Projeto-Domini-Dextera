
export class FinSystem {
    name: string;
    value: number;
    id: number;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;
    establishmentId: number;


    public constructor(init?: Partial<FinSystem>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): FinSystem {
        return Object.assign(new FinSystem(), jsonData);
    }
}
