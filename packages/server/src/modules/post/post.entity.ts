import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
class Social {
  @Field()
  reference: string;

  @Field(() => String, { nullable: true })
  instagram?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  telegram?: string;
}

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  phone: string;

  @Field(() => Social)
  links: Social;

  @Field()
  price: number;

  // TODO: implement images
}
