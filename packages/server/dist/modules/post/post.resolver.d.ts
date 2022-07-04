import { Post } from './post.entity';
import { PostService } from './post.service';
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    posts(): Post[];
}
