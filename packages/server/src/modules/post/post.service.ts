import { Injectable } from '@nestjs/common';
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
}
