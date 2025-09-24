import { components } from "~/shared/api/openapi";
import { Quest } from './model';

type Schemas = components['schemas'];

export function mapDtoToQuest(dto: Schemas['Quest']): Quest {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    type: dto.type,
    questRequired: dto.questRequired ? mapDtoToQuest(dto.questRequired) : null,
    attribute: dto.attribute,
    points: dto.points,
    createdAt: dto.createdAt
  };
}