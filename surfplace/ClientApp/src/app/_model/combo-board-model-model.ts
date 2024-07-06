
export class ComboBoardModel {
  id: number;
  comboId: number;
  boardModelId: number;

  public constructor(init?: Partial<ComboBoardModel>) {
    Object.assign(this, init);
  }

  static fromJson(jsonData: any): ComboBoardModel {
    return Object.assign(new ComboBoardModel(), jsonData);
  }
}
