import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../uuid.js';
import { ChangeUserInputType, CreateUserInputType, User } from './types.js';

export const users: GraphQLFieldConfig<null, Context> = {
  type: new GraphQLList(User),
  resolve(source, args, { prisma }: Context) {
    return prisma.user.findMany();
  },
};

export const user: GraphQLFieldConfig<null, Context> = {
  type: User,
  args: { id: { type: UUIDType } },
  resolve(source, { id }: { id: string }, { prisma }: Context) {
    return prisma.user.findUnique({ where: { id } });
  },
};

export const createUser: GraphQLFieldConfig<null, Context> = {
  type: User,
  args: { dto: { type: CreateUserInputType } },
  resolve(
    source,
    { dto }: { dto: { name: string; balance: number } },
    { prisma }: Context,
  ) {
    return prisma.user.create({ data: dto });
  },
};

export const deleteUser: GraphQLFieldConfig<null, Context> = {
  type: GraphQLString,
  args: { id: { type: UUIDType } },
  async resolve(source, { id }: { id: string }, { prisma }: Context) {
    await prisma.user.delete({ where: { id } });
    return '';
  },
};

export const changeUser: GraphQLFieldConfig<null, Context> = {
  type: User,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangeUserInputType },
  },
  resolve(
    source,
    {
      id,
      dto,
    }: {
      id: string;
      dto: { name: string; balance: number };
    },
    { prisma }: Context,
  ) {
    try {
      return prisma.user.update({ where: { id }, data: dto });
    } catch {
      return '';
    }
  },
};

export const subscribeTo: GraphQLFieldConfig<null, Context> = {
  type: User,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  resolve(
    source,
    { userId, authorId }: { userId: string; authorId: string },
    { prisma }: Context,
  ) {
    return prisma.user.update({
      where: { id: userId },
      data: { userSubscribedTo: { create: { authorId } } },
    });
  },
};

export const unsubscribeFrom: GraphQLFieldConfig<null, Context> = {
  type: GraphQLString,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  async resolve(
    source,
    { userId, authorId }: { userId: string; authorId: string },
    { prisma }: Context,
  ) {
    await prisma.subscribersOnAuthors.delete({
      where: { subscriberId_authorId: { subscriberId: userId, authorId } },
    });
  },
};
