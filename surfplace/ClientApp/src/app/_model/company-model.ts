export class Company {
    name: string;
    email: string;
    cnpj: number;
    id: number;
    active: boolean;


    public constructor(init?: Partial<Company>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Company {
        return Object.assign(new Company(), jsonData);
    }
}
