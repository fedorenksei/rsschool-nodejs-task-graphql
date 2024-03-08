import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import { Context } from './context.js';
import { MemberType, MemberTypeIdType } from './member-type.js';
import { UUIDType } from './uuid.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdType },
    memberType: {
      type: MemberType,
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.profile.findUnique({ where: { id: source.id } }).memberType();
      },
    },
  },
});

export const ProfileDto = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdType },
    userId: { type: UUIDType },
  }),
});
