import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context } from './context.js';
import { Post } from './post.js';
import { UUIDType } from './uuid.js';
import { Profile } from './profile.js';

export const User: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
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
