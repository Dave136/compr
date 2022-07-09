import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { PostCreateInput } from './dto/post-create.input';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findById(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  async create(postCreateInput: PostCreateInput): Promise<Post> {
    const post: Post = {
      id: v4(),
      ...postCreateInput,
    };

    const created = await this.postsRepository.save(post);
    return created;
  }

  async update(id: string, postBody: Partial<PostCreateInput>): Promise<Post> {
    await this.postsRepository.update(id, postBody);
    const post = await this.findById(id);
    return post;
  }

  async remove(id: string): Promise<Post> {
    const post = await this.findById(id);
    await this.postsRepository.delete(id);
    return post;
  }
}
