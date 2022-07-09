import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Social {
  @Field()
  @Column()
  reference: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  instagram?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  telegram?: string;
}

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 60 })
  title: string;

  @Field()
  @Column({ length: 300 })
  content: string;

  @Field()
  @Column({ length: 15 })
  phone: string;

  @Field(() => Social)
  @Column(() => Social)
  links: Social;

  @Field()
  @Column({ type: 'int' })
  price: number;

  // TODO: implement images
}
