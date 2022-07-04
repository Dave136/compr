import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { PostCreateInput } from './post-create.input';
// import { IsNotEmpty } from 'class-validator';

// @ArgsType()
// class SocialInterface {
//   @Field()
//   reference: string;

//   @Field(() => String, { nullable: true })
//   instagram?: string;

//   @Field(() => String, { nullable: true })
//   twitter?: string;

//   @Field(() => String, { nullable: true })
//   telegram?: string;
// }

// @ArgsType()
// class PostInterface {
//   @Field()
//   title: string;

//   @Field()
//   content: string;

//   @Field()
//   phone: string;

//   @Field(() => SocialInterface)
//   links: SocialInterface;

//   @Field()
//   price: number;
// }

// @InputType()
// export class UpdatePostArgs {
//   @Field()
//   @IsNotEmpty()
//   id: string;

//   @Field()
//   post: PostInterface;
// }

@InputType()
export class UpdatePostArgs extends PartialType(PostCreateInput) {
  @Field()
  id: string;
}
