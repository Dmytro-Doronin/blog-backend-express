import {app} from "../../src/app";
import request = require('supertest')
import {BlogInputModelType, PostInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createBlogManager} from "../utils/createBlogManager";
import {createPostManager} from "../utils/createPostManager";
import {routePath} from "../../src/variables";
// describe('/blogs', () => {
//
//     beforeEach(async () => {
//         await request(app).delete('/api/testing/all-data')
//     })
//
//     it ('Should create and add post to the db', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const data: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         await createPostManager.createPost(data, 201)
//
//     })
//
//     it ('Should get all posts', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const data: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//         const {createdPost} = await createPostManager.createPost(data, 201)
//
//         await request(app)
//             .get(`/api/posts`)
//             .expect(200, {
//                 pagesCount: 1,
//                 page: 1,
//                 pageSize: 10,
//                 totalCount: 1,
//                 items: [createdPost]
//             })
//     })
//
//     it ('Should get post by id', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const data: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//         const {createdPost} = await createPostManager.createPost(data, 201)
//
//         await request(app)
//             .get(`/api/posts/${createdPost.id}`)
//             .expect(200, createdPost)
//     })
//
//     it ('Should not get post by incorrect id', async () => {
//
//         await request(app)
//             .get(`/api/posts/asdasdasd`)
//             .expect(404)
//     })
//
//     it ('Should change post by id', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         const newPost: PostInputModelType = {
//             title: "Home",
//             shortDescription: "YEs YEs",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//         await request(app)
//             .put(`/api/posts/${createdPost.id}`)
//             .send(newPost)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(204)
//     })
//
//     it ('Should not change post by id with incorrect title', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         const newPost: PostInputModelType = {
//             title: "HomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHomeHome",
//             shortDescription: "YEs YEs",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//         await request(app)
//             .put(`/api/posts/${createdPost.id}`)
//             .send(newPost)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(400, {
//                 errorsMessages: [
//                     {
//                         message: "The field must not be more then 30 symbols",
//                         field: "title"
//                     }
//                 ]
//             })
//     })
//
//     it ('Should not change post by id with incorrect shortDescription', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         const newPost: PostInputModelType = {
//             title: "Home",
//             shortDescription: "TrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrololoTrrol",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//         await request(app)
//             .put(`/api/posts/${createdPost.id}`)
//             .send(newPost)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(400, {
//                 errorsMessages: [
//                     {
//                         message: "The field must not be more then 100 symbols",
//                         field: "shortDescription"
//                     }
//                 ]
//             })
//     })
//
//     it ('Should not change post by id with incorrect content', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         const newPost: PostInputModelType = {
//             title: "Home",
//             shortDescription: "Trro",
//             content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,',
//             blogId: createdBlog.id
//         }
//         await request(app)
//             .put(`/api/posts/${createdPost.id}`)
//             .send(newPost)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(400, {
//                 errorsMessages: [
//                     {
//                         message: 'The field must not be more then 1000 symbols',
//                         field: "content"
//                     }
//                 ]
//             })
//     })
//
//     it ('Should not change post by id with incorrect blogId', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololo',
//             blogId: createdBlog.id
//         }
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         const newPost: PostInputModelType = {
//             title: "Home",
//             shortDescription: "Trro",
//             content: 'Lorem,',
//             blogId: ''
//         }
//         await request(app)
//             .put(`/api/posts/${createdPost.id}`)
//             .send(newPost)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(400, {
//                 errorsMessages: [
//                     {
//                         message: 'Incorrect blogId',
//                         field: "blogId"
//                     }
//                 ]
//             })
//     })
//
//     it ('Should delete post by id with incorrect id', async () => {
//
//         const newBlog: BlogInputModelType = {
//             name: "Home",
//             description: "a wanna go home",
//             websiteUrl: "https://www.gohome.com"
//         }
//
//         const {createdBlog} = await createBlogManager.createBlog(newBlog, 201)
//
//         const post: PostInputModelType = {
//             title: "Home",
//             shortDescription: "a wanna go home",
//             content: 'Trrololos',
//             blogId: createdBlog.id
//         }
//
//
//         const {createdPost} = await createPostManager.createPost(post, 201)
//
//         await request(app)
//             .delete(`/api/posts/${createdPost.id}`)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(204)
//     })
//
//     it ('Should non delete post by id with incorrect id', async () => {
//
//
//         await request(app)
//             .delete(`/api/posts/asdfsdfsdf`)
//             .withCredentials(true)
//             .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
//             .expect(404)
//     })
//
//     afterAll(done => {
//         done()
//     })
//
// })