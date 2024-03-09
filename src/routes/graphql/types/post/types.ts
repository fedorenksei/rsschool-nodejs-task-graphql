import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../uuid.js';

const UserDtoFields = {
  title: { type: GraphQLString },
  content: { type: GraphQLString },
  authorId: { type: UUIDType },
};

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: UUIDType },
    ...UserDtoFields,
  },
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: UserDtoFields,
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: UserDtoFields,
});
