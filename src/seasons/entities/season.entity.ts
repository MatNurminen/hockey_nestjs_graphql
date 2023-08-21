import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('seasons')
@ObjectType()
export class Season {
  @PrimaryColumn()
  @Field(() => ID, { description: 'A unique identifier' })
  id: number;

  @Column()
  @Field({ description: 'The name of a season' })
  name: string;

  @Column()
  @Field({ description: 'The logo of a season' })
  logo: string;

  @Column()
  @Field({ description: 'The link of a season' })
  link: string;

  @OneToMany(() => Tournament, (tournament) => tournament.season)
  @Field((type) => [Tournament], { description: 'The tournaments of a season' })
  tournaments?: Tournament[];
}
