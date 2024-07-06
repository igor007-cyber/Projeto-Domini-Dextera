
export class ComboProduct {
  description: string;
  id: number;
  comboId: number;


  public constructor(init?: Partial<ComboProduct>) {
      Object.assign(this, init);
  }

  static fromJson(jsonData: any): ComboProduct {
      return Object.assign(new ComboProduct(), jsonData);
  }
}
