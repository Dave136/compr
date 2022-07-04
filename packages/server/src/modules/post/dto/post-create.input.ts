import { InputType, Field } from '@nestjs/graphql';

@InputType()
class SocialInput {
  @Field()
  reference: string;

  @Field(() => String, { nullable: true })
  instagram?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  telegram?: string;
}

@InputType()
export class PostCreateInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  phone: string;

  @Field()
  price: number;

  @Field()
  links: SocialInput;
}
