import { ApplicationPresenter } from '../ApplicationPresenter';

export function simulateAppReady() {
  new ApplicationPresenter().signalReady();
}
