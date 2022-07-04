import { Injectable } from '@nestjs/common';
import { PostCreateInput } from './dto/post-create.input';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  private posts: Post[] = [
    {
      id: '1',
      title: 'My personal title',
      content: 'My personal content',
      phone: '+584121239847',
      price: 20,
      links: {
        reference: 'reference page',
      },
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findById(id: string): Post {
    return this.posts.find((post) => post.id === id);
  }

  createPost(postCreateInput: PostCreateInput): Post {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postCreateInput,
    };

    this.posts.push(newPost);

    return newPost;
  }

  updatePost(id: string, postBody: Partial<PostCreateInput>): Post {
    const post = this.findById(id);

    if (!post) {
      throw new Error('The post was not found');
    }

    const updated = this.posts.map((post) =>
      post.id === id ? { ...post, ...postBody } : post,
    );

    this.posts = updated;

    return this.findById(id);
  }
}
