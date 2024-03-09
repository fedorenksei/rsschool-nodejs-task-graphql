import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import { Context } from '../context.js';
import { MemberType, MemberTypeIdType } from '../memberType/types.js';
import { UUIDType } from '../uuid.js';

const ProfileDtoFields = {
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
  memberTypeId: { type: MemberTypeIdType },
};

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    ...ProfileDtoFields,
    userId: { type: UUIDType },
    memberType: {
      type: MemberType,
      resolve(source: { id: string }, args, { prisma }: Context) {
        return prisma.profile.findUnique({ where: { id: source.id } }).memberType();
      },
    },
  },
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    ...ProfileDtoFields,
    userId: { type: UUIDType },
  },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: ProfileDtoFields,
});
