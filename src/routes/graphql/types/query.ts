import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { User } from './user.js';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { MemberType } from './member-type.js';

type Context = {
  prisma: PrismaClient;
};

export const gqlQuerySchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(User),
        resolve(source, args, context: Context) {
          return context.prisma.user.findMany();
        },
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(source, args, context: Context) {
          return context.prisma.post.findMany();
        },
      },
      profiles: {
        type: new GraphQLList(Profile),
        resolve(source, args, context: Context) {
          return context.prisma.profile.findMany();
        },
      },
      memberTypes: {
        type: new GraphQLList(MemberType),
        resolve(source, args, context: Context) {
          return context.prisma.memberType.findMany();
        },
      },
    },
  }),
});
