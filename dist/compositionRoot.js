"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
const blogsService_1 = require("./services/blogs/blogsService");
const blogMutation_1 = require("./repositories/mutationRepositories/blogMutation");
const blogsController_1 = require("./controllers/blogsController");
const blogQuery_1 = require("./repositories/queryRepositories/blogQuery");
const inversify_1 = require("inversify");
const postsControllers_1 = require("./controllers/postsControllers");
const postQuery_1 = require("./repositories/queryRepositories/postQuery");
const postsService_1 = require("./services/posts/postsService");
const postMutation_1 = require("./repositories/mutationRepositories/postMutation");
const commentsController_1 = require("./controllers/commentsController");
const commentQuery_1 = require("./repositories/queryRepositories/commentQuery");
const commentMutation_1 = require("./repositories/mutationRepositories/commentMutation");
const commentsService_1 = require("./services/comments/commentsService");
const authController_1 = require("./controllers/authController");
const authService_1 = require("./services/auth/authService");
const authMutation_1 = require("./repositories/mutationRepositories/authMutation");
exports.container = new inversify_1.Container();
// const blogMutation = new BlogMutation()
// const blogService = new BlogsService(blogMutation)
// const blogQuery = new BlogQuery()
// export const blogControllerInstance = new BlogController(blogService, blogQuery)
//blogs
exports.container.bind(blogsController_1.BlogController).to(blogsController_1.BlogController);
exports.container.bind(blogsService_1.BlogsService).to(blogsService_1.BlogsService);
exports.container.bind(blogMutation_1.BlogMutation).to(blogMutation_1.BlogMutation);
exports.container.bind(blogQuery_1.BlogQuery).to(blogQuery_1.BlogQuery);
//posts
exports.container.bind(postsControllers_1.PostController).to(postsControllers_1.PostController);
exports.container.bind(postQuery_1.PostQuery).to(postQuery_1.PostQuery);
exports.container.bind(postsService_1.PostsService).to(postsService_1.PostsService);
exports.container.bind(postMutation_1.PostMutation).to(postMutation_1.PostMutation);
//comments
exports.container.bind(commentsController_1.CommentsController).to(commentsController_1.CommentsController);
exports.container.bind(commentsService_1.CommentsService).to(commentsService_1.CommentsService);
exports.container.bind(commentQuery_1.CommentQuery).to(commentQuery_1.CommentQuery);
exports.container.bind(commentMutation_1.CommentMutation).to(commentMutation_1.CommentMutation);
//auth
exports.container.bind(authController_1.AuthController).to(authController_1.AuthController);
exports.container.bind(authService_1.AuthService).to(authService_1.AuthService);
exports.container.bind(authMutation_1.AuthMutation).to(authMutation_1.AuthMutation);
