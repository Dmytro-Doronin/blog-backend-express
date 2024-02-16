import {BlogsService} from "./services/blogs/blogsService";
import {BlogMutation} from "./repositories/mutationRepositories/blogMutation";
import {BlogController} from "./controllers/blogsController";
import {BlogQuery} from "./repositories/queryRepositories/blogQuery";

const blogMutation = new BlogMutation()
const blogService = new BlogsService(blogMutation)
const blogQuery = new BlogQuery()
export const blogControllerInstance = new BlogController(blogService, blogQuery)