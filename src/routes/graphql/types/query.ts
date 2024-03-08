import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Context } from './context.js';
import { MemberType, MemberTypeIdType } from './member-type.js';
import { Post, PostDto } from './post.js';
import { Profile, ProfileDto } from './profile.js';
import { User, UserDto } from './user.js';
import { UUIDType } from './uuid.js';

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
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: User,
        args: { dto: { type: new GraphQLNonNull(UserDto) } },
        resolve(
          source,
          data: { dto: { name: string; balance: number } },
          { prisma }: Context,
        ) {
          return prisma.user.create({ data: data.dto });
        },
      },
      createPost: {
        type: Post,
        args: { dto: { type: new GraphQLNonNull(PostDto) } },
        resolve(
          source,
          data: { dto: { title: string; content: string; authorId: string } },
          { prisma }: Context,
        ) {
          return prisma.post.create({ data: data.dto });
        },
      },
      createProfile: {
        type: Profile,
        args: { dto: { type: new GraphQLNonNull(ProfileDto) } },
        resolve(
          source,
          data: {
            dto: {
              isMale: boolean;
              yearOfBirth: number;
              memberTypeId: string;
              userId: string;
            };
          },
          { prisma }: Context,
        ) {
          return prisma.profile.create({ data: data.dto });
        },
      },
    },
  }),
});
