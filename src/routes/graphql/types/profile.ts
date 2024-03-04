import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { MemberTypeIdType } from './member-type.js';
import { UUIDType } from './uuid.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdType },
  },
});
