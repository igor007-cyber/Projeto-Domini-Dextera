import { City } from './city-model';

export class Establishment {
    id: number;
    name: string;
    details: string;
    imageName: string;
    publicPlace: string;
    postalCode: string;
    telephone: string;
    whatsApp: string;

    district: string;
  cityId: number;
    state: string;
    email: string;
    facebook: string;
    instagram: string;
    description: string;
    webSite: string;
    city: City;

    warranty: string;
      pixDiscount: number;
      freeShipping: number;
      minimumValue: number;
      numberInstallmentsCard: number;
      isPartner: boolean;
active: boolean;

    public constructor(init?: Partial<Establishment>) {
        Object.assign(this, init);
    }
}
