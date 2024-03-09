import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from '../context.js';
import { Post } from '../post/types.js';
import { Profile } from '../profile/types.js';
import { UUIDType } from '../uuid.js';

const UserDtoFields = {
  name: { type: GraphQLString },
  balance: { type: GraphQLFloat },
};

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    ...UserDtoFields,
    posts: {
      type: new GraphQLList(Post),
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.user.findUnique({ where: { id: source.id } }).posts();
      },
    },
    profile: {
      type: Profile,
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.user.findUnique({ where: { id: source.id } }).profile();
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.user.findMany({
          where: { subscribedToUser: { some: { subscriberId: source.id } } },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.user.findMany({
          where: { userSubscribedTo: { some: { authorId: source.id } } },
        });
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: UserDtoFields,
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: UserDtoFields,
});
