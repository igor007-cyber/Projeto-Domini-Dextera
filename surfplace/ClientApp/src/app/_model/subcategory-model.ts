import { Category } from './category-model';
export class SubCategory {
    id: number;
    description: string;
    categoryId: number;
    active: boolean;
    category: Category;
}
