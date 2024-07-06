export class PartnerType {
  id: number;
  description: string;
  isSelected: boolean;

  public constructor(init?: Partial<PartnerType>) {
      Object.assign(this, init);
  }
}
