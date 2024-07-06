import { Brand } from "./brand-model";
import { Company } from "./company-model";

export class Product {
    description: string;
    code: string;
    id: number;
    imageName: string;
    createDate: Date;
    updateDate: Date;
    valueMinimum: number;
    value: number;
    companyId: number;
    brandId: number;
    active: boolean;
    brand: Brand;
    company: Company;

    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }

    static fromJson(jsonData: any): Product {
        return Object.assign(new Product(), jsonData);
    }

}