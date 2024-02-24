"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const blogMutation_1 = require("../../repositories/mutationRepositories/blogMutation");
const mapper_1 = require("../../utils/mapper");
const { v4: uuidv4 } = require('uuid');
const inversify_1 = require("inversify");
let BlogsService = class BlogsService {
    constructor(blogMutation) {
        this.blogMutation = blogMutation;
    }
    createBlogService({ name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: uuidv4(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const blog = yield this.blogMutation.createBlogInDb(newBlog);
            if (!blog) {
                return null;
            }
            return (0, mapper_1.blogMapper)(blog);
        });
    }
    changeBlogByIdService({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogMutation.changeBlogByIdInDb({ id, name, description, websiteUrl });
        });
    }
    deleteBlogByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.blogMutation.deleteBlogByIdInDb(id);
        });
    }
    createPostToBlogService({ id }, { title, shortDescription, content }) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogMutation.getBlogByIdInDb(id);
            if (!blog) {
                return null;
            }
            const newPost = {
                id: uuidv4(),
                title,
                shortDescription,
                content,
                blogId: blog.id,
                createdAt: (new Date().toISOString()),
                blogName: blog.name
            };
            const postFromDb = yield this.blogMutation.createPostToBlogInDb(newPost);
            if (!postFromDb) {
                return null;
            }
            return (0, mapper_1.postMapper)(postFromDb);
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(blogMutation_1.BlogMutation)),
    __metadata("design:paramtypes", [blogMutation_1.BlogMutation])
], BlogsService);
