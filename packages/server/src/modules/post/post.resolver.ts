import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  posts(): Post[] {
    return this.postService.findAll();
  }
}
