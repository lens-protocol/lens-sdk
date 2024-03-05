import { PublicationId } from '../../entities';
import {
  ITogglablePropertyGateway,
  ITogglablePropertyPresenter,
  ToggleProperty,
} from '../_common/ToggleProperty';

export type TogglePublicationPropertyRequest = {
  id: PublicationId;
};

export interface ITogglablePublicationPropertyGateway
  extends ITogglablePropertyGateway<TogglePublicationPropertyRequest> {}

export interface ITogglablePublicationPropertyPresenter
  extends ITogglablePropertyPresenter<TogglePublicationPropertyRequest> {}

export const TogglePublicationProperty = ToggleProperty<TogglePublicationPropertyRequest>;
