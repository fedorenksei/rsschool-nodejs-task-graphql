import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { CreatePostInputType, Post } from './types.js';
import { Context } from '../context.js';
import { UUIDType } from '../uuid.js';

export const posts: GraphQLFieldConfig<null, Context> = {
  type: new GraphQLList(Post),
  resolve(source, args, { prisma }: Context) {
    return prisma.post.findMany();
  },
};

export const post: GraphQLFieldConfig<null, Context> = {
  type: Post,
  args: { id: { type: UUIDType } },
  resolve(source, { id }: { id: string }, { prisma }: Context) {
    return prisma.post.findUnique({ where: { id } });
  },
};

export const createPost: GraphQLFieldConfig<null, Context> = {
  type: Post,
  args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
  resolve(
    source,
    data: { dto: { title: string; content: string; authorId: string } },
    { prisma }: Context,
  ) {
    return prisma.post.create({ data: data.dto });
  },
};
