"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentMapper = exports.userMapper = exports.postMapper = exports.blogMapper = void 0;
const blogMapper = (blog) => {
    return {
        id: blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
};
exports.blogMapper = blogMapper;
const postMapper = (post) => {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
};
exports.postMapper = postMapper;
const userMapper = (user) => {
    return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    };
};
exports.userMapper = userMapper;
const commentMapper = (comment) => {
    return {
        id: comment.id,
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt
    };
};
exports.commentMapper = commentMapper;
