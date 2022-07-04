import { Query, Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { GetPostArgs } from './dto/get-post.args';
import { PostCreateInput } from './dto/post-create.input';
import { UpdatePostArgs } from './dto/update-post.args';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  posts(): Post[] {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post', nullable: false })
  getPost(@Args() getPostArgs: GetPostArgs): Post {
    return this.postService.findById(getPostArgs.id);
  }

  @Mutation(() => Post)
  createPost(
    @Context() ctx: any,
    @Args('input') createPostInput: PostCreateInput,
  ): Post {
    console.log({ ctx });
    return this.postService.createPost(createPostInput);
  }

  @Mutation(() => Post)
  updatePost(@Args('input') post: UpdatePostArgs): Post {
    return this.postService.updatePost(post.id, post);
  }
}
