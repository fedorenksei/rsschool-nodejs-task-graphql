import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberType, memberTypes } from './types/memberType/fields.js';
import { changePost, createPost, deletePost, post, posts } from './types/post/fields.js';
import {
  changeProfile,
  createProfile,
  deleteProfile,
  profile,
  profiles,
} from './types/profile/fields.js';
import {
  changeUser,
  createUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
  user,
  users,
} from './types/user/fields.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user,
    users,
    post,
    posts,
    profile,
    profiles,
    memberType,
    memberTypes,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser,
    createPost,
    createProfile,
    deleteUser,
    deletePost,
    deleteProfile,
    changeUser,
    changePost,
    changeProfile,
    subscribeTo,
    unsubscribeFrom,
  },
});

export const gqlSchema = new GraphQLSchema({
  query,
  mutation,
});
