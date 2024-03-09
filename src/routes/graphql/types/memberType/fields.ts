import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { Context } from '../context.js';
import { MemberType, MemberTypeIdType } from './types.js';

export const memberTypes: GraphQLFieldConfig<null, Context> = {
  type: new GraphQLList(MemberType),
  resolve(source, args, { prisma }: Context) {
    return prisma.memberType.findMany();
  },
};

export const memberType: GraphQLFieldConfig<null, Context> = {
  type: MemberType,
  args: { id: { type: MemberTypeIdType } },
  resolve(source, { id }: { id: string }, { prisma }: Context) {
    return prisma.memberType.findUnique({ where: { id } });
  },
};
