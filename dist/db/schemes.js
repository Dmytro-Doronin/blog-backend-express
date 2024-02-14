"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateModel = exports.DeviceModel = exports.BlackListModel = exports.CommentModel = exports.UserModel = exports.PostModel = exports.BlogModel = exports.RateSchema = exports.DeviceSchema = exports.BlackListSchema = exports.CommentSchema = exports.UserSchema = exports.PostSchema = exports.BlogScheme = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BlogScheme = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    createdAt: { type: String, required: true },
    isMembership: { type: Boolean, required: true }
});
exports.PostSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    blogId: { type: String, required: true },
    blogName: { type: String, required: true },
    createdAt: { type: String, required: true },
});
exports.UserSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    accountData: {
        login: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        passwordSalt: { type: String, required: true },
        createdAt: { type: String, required: true },
    },
    emailConfirmation: {
        confirmationCode: { type: String, required: true },
        expirationDate: { type: Date, required: true },
        isConfirmed: { type: Boolean, required: true }
    },
    passwordRecovery: {
        passwordRecoveryCode: { type: String, required: true },
        expirationDate: { type: Date, required: true },
    }
});
exports.CommentSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    postId: { type: String, required: true },
    content: { type: String, required: true },
    commentatorInfo: {
        userId: { type: String, required: true },
        userLogin: { type: String, required: true },
    },
    createdAt: { type: String, required: true },
    likesInfo: {
        likesCount: { type: Number, required: true },
        dislikesCount: { type: Number, required: true },
        myStatus: { type: String, enum: ['Like', 'Dislike', 'None'], required: true },
        likedBy: { type: [String], default: [] },
        dislikedBy: { type: [String], default: [] }
    }
});
exports.BlackListSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true }
});
exports.DeviceSchema = new mongoose_1.default.Schema({
    lastActiveDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    deviceId: { type: String, required: true },
    ip: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: String, required: true }
});
exports.RateSchema = new mongoose_1.default.Schema({
    IP: { type: String, required: true },
    URL: { type: String, required: true },
    date: { type: Date, required: true }
});
exports.BlogModel = mongoose_1.default.model('blogs', exports.BlogScheme);
exports.PostModel = mongoose_1.default.model('posts', exports.PostSchema);
exports.UserModel = mongoose_1.default.model('users', exports.UserSchema);
exports.CommentModel = mongoose_1.default.model('comments', exports.CommentSchema);
exports.BlackListModel = mongoose_1.default.model('blackListOfToken', exports.BlackListSchema);
exports.DeviceModel = mongoose_1.default.model('device', exports.DeviceSchema);
exports.RateModel = mongoose_1.default.model('rate', exports.RateSchema);
