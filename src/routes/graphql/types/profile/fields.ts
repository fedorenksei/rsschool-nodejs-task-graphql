import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../uuid.js';
import { ChangeProfileInputType, CreateProfileInputType, Profile } from './types.js';

export const profiles: GraphQLFieldConfig<null, Context> = {
  type: new GraphQLList(Profile),
  resolve(source, args, { prisma }: Context) {
    return prisma.profile.findMany();
  },
};

export const profile: GraphQLFieldConfig<null, Context> = {
  type: Profile,
  args: { id: { type: UUIDType } },
  resolve(source, { id }: { id: string }, { prisma }: Context) {
    return prisma.profile.findUnique({ where: { id } });
  },
};

export const createProfile: GraphQLFieldConfig<null, Context> = {
  type: Profile,
  args: { dto: { type: CreateProfileInputType } },
  resolve(
    source,
    {
      dto,
    }: {
      dto: {
        isMale: boolean;
        yearOfBirth: number;
        memberTypeId: string;
        userId: string;
      };
    },
    { prisma }: Context,
  ) {
    return prisma.profile.create({ data: dto });
  },
};

export const deleteProfile: GraphQLFieldConfig<null, Context> = {
  type: GraphQLString,
  args: { id: { type: UUIDType } },
  async resolve(source, { id }: { id: string }, { prisma }: Context) {
    await prisma.profile.delete({ where: { id } });
    return '';
  },
};

export const changeProfile: GraphQLFieldConfig<null, Context> = {
  type: Profile,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangeProfileInputType },
  },
  resolve(
    source,
    {
      id,
      dto,
    }: {
      id: string;
      dto: { isMale: boolean; yearOfBirth: number; memberTypeId: string; userId: string };
    },
    { prisma }: Context,
  ) {
    return prisma.profile.update({ where: { id }, data: dto });
  },
};
