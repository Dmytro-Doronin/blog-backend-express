import "reflect-metadata"
import {BlogsService} from "./services/blogs/blogsService";
import {BlogMutation} from "./repositories/mutationRepositories/blogMutation";
import {BlogController} from "./controllers/blogsController";
import {BlogQuery} from "./repositories/queryRepositories/blogQuery";
import { Container } from "inversify";
import {PostController} from "./controllers/postsControllers";
import {PostQuery} from "./repositories/queryRepositories/postQuery";
import {PostsService} from "./services/posts/postsService";
import {PostMutation} from "./repositories/mutationRepositories/postMutation";
import {CommentsController} from "./controllers/commentsController";
import {CommentQuery} from "./repositories/queryRepositories/commentQuery";
import {CommentMutation} from "./repositories/mutationRepositories/commentMutation";
import {CommentsService} from "./services/comments/commentsService";
import {AuthController} from "./controllers/authController";
import {AuthService} from "./services/auth/authService";
import {AuthMutation} from "./repositories/mutationRepositories/authMutation";

export let container = new Container()


// const blogMutation = new BlogMutation()
// const blogService = new BlogsService(blogMutation)
// const blogQuery = new BlogQuery()
// export const blogControllerInstance = new BlogController(blogService, blogQuery)

//blogs
container.bind(BlogController).to(BlogController)
container.bind(BlogsService).to(BlogsService)
container.bind(BlogMutation).to(BlogMutation)
container.bind(BlogQuery).to(BlogQuery)

//posts
container.bind(PostController).to(PostController)
container.bind(PostQuery).to(PostQuery)
container.bind(PostsService).to(PostsService)
container.bind(PostMutation).to(PostMutation)

//comments
container.bind(CommentsController).to(CommentsController)
container.bind(CommentsService).to(CommentsService)
container.bind(CommentQuery).to(CommentQuery)
container.bind(CommentMutation).to(CommentMutation)

//auth
container.bind(AuthController).to(AuthController)
container.bind(AuthService).to(AuthService)
container.bind(AuthMutation).to(AuthMutation)

