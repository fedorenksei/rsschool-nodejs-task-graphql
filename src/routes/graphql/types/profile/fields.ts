import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { CreateProfileInputType, Profile } from './profile.js';
import { UUIDType } from '../uuid.js';
import { Context } from '../context.js';

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
  args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
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
};
