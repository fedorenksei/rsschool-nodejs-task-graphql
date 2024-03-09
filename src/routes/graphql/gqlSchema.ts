import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { memberType, memberTypes } from './types/memberType/fields.js';
import { createPost, post, posts } from './types/post/fields.js';
import { createProfile, profile, profiles } from './types/profile/fields.js';
import { createUser, user, users } from './types/user/fields.js';

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
  },
});

export const gqlSchema = new GraphQLSchema({
  query,
  mutation,
});
