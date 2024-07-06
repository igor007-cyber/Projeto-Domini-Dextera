export class Finishing {
  name: string;
  details: string;
  value: number;
  establishmentId: number;
  id: number;
  criadoPor: string;
  alteradoPor: string;
  createDate: Date;
  updateDate: Date;


  public constructor(init?: Partial<Finishing>) {
      Object.assign(this, init);
  }

  static fromJson(jsonData: any): Finishing {
      return Object.assign(new Finishing(), jsonData);
  }
}
