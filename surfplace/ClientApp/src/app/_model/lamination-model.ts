export class Lamination {
    name: string;
    details: string;
    id: number;
    value: number;
    criadoPor: string;
    alteradoPor: string;
    createDate: Date;
    updateDate: Date;
    establishmentId: number;

    public constructor(init?: Partial<Lamination>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Lamination {
        return Object.assign(new Lamination(), jsonData);
    }
}
