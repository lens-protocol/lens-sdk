import { ProfileId } from '../../entities';
import {
  ITogglablePropertyGateway,
  ITogglablePropertyPresenter,
  ToggleProperty,
} from '../_common/ToggleProperty';

export type ToggleProfilePropertyRequest = {
  id: ProfileId;
};

export interface ITogglableProfilePropertyGateway
  extends ITogglablePropertyGateway<ToggleProfilePropertyRequest> {}

export interface ITogglableProfilePropertyPresenter
  extends ITogglablePropertyPresenter<ToggleProfilePropertyRequest> {}

export const ToggleProfileProperty = ToggleProperty<ToggleProfilePropertyRequest>;
