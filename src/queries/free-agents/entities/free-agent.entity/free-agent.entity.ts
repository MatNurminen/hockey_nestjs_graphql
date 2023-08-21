import { Field, ObjectType } from '@nestjs/graphql';
import { Player } from '../../../../players/entities/player.entity';

@ObjectType({ description: 'Free agent model' })
export class FreeAgent extends Player {
  @Field({ description: 'The flag of player nation' })
  flag: string;
}
