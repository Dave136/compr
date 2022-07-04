import { InputType, OmitType } from '@nestjs/graphql';
import { Post } from '../post.entity';

@InputType()
export class PostCreateInput extends OmitType(Post, ['id'], InputType) {}
