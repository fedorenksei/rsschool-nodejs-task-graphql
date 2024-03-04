import { PrismaClient } from '@prisma/client';
import { GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { User } from './user.js';
import { Post } from './post.js';
import { Profile } from './profile.js';
import { MemberType, MemberTypeIdType } from './member-type.js';
import { UUIDType } from './uuid.js';

type Context = {
  prisma: PrismaClient;
};

export const gqlQuerySchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(User),
        resolve(source, args, { prisma }: Context) {
          return prisma.user.findMany();
        },
      },
      user: {
        type: User,
        args: { id: { type: UUIDType } },
        resolve(source, { id }: { id: string }, { prisma }: Context) {
          return prisma.user.findUnique({ where: { id } });
        },
      },
      posts: {
        type: new GraphQLList(Post),
        resolve(source, args, { prisma }: Context) {
          return prisma.post.findMany();
        },
      },
      post: {
        type: Post,
        args: { id: { type: UUIDType } },
        resolve(source, { id }: { id: string }, { prisma }: Context) {
          return prisma.post.findUnique({ where: { id } });
        },
      },
      profiles: {
        type: new GraphQLList(Profile),
        resolve(source, args, { prisma }: Context) {
          return prisma.profile.findMany();
        },
      },
      profile: {
        type: Profile,
        args: { id: { type: UUIDType } },
        resolve(source, { id }: { id: string }, { prisma }: Context) {
          return prisma.profile.findUnique({ where: { id } });
        },
      },
      memberTypes: {
        type: new GraphQLList(MemberType),
        resolve(source, args, { prisma }: Context) {
          return prisma.memberType.findMany();
        },
      },
      memberType: {
        type: MemberType,
        args: { id: { type: MemberTypeIdType } },
        resolve(source, { id }: { id: string }, { prisma }: Context) {
          return prisma.memberType.findUnique({ where: { id } });
        },
      },
    },
  }),
});
