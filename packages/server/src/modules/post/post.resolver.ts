import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PostCreateInput } from './dto/post-create.input';
import { UpdatePostArgs } from './dto/update-post.args';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts', nullable: false })
  @UseGuards(GqlAuthGuard)
  posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post', nullable: false })
  @UseGuards(GqlAuthGuard)
  getPost(@Args('id') id: string): Promise<Post> {
    return this.postService.findById(id);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  createPost(@Args('input') createPostInput: PostCreateInput): Promise<Post> {
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  updatePost(@Args('input') post: UpdatePostArgs): Promise<Post> {
    return this.postService.update(post.id, post);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('id') id: string): Promise<Post> {
    return this.postService.remove(id);
  }
}
