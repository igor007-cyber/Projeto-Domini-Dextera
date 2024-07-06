import { Establishment } from './establishment-model';
import { State } from './state-model';

export class EstablishmentState {
  taxValue: number;
  establishmentId: number;
  stateId: number;
  day: number;
  id: number;

  establishment: Establishment;
  state: State;

}
