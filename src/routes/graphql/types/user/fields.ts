import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../uuid.js';
import { CreateUserInputType, User } from './types.js';

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
  args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
  resolve(source, data: { dto: { name: string; balance: number } }, { prisma }: Context) {
    return prisma.user.create({ data: data.dto });
  },
};
