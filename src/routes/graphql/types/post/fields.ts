import { GraphQLFieldConfig, GraphQLList, GraphQLString } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../uuid.js';
import { ChangePostInputType, CreatePostInputType, Post } from './types.js';

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
  args: { dto: { type: CreatePostInputType } },
  resolve(
    source,
    { dto }: { dto: { title: string; content: string; authorId: string } },
    { prisma }: Context,
  ) {
    return prisma.post.create({ data: dto });
  },
};

export const deletePost: GraphQLFieldConfig<null, Context> = {
  type: GraphQLString,
  args: { id: { type: UUIDType } },
  async resolve(source, { id }: { id: string }, { prisma }: Context) {
    await prisma.post.delete({ where: { id } });
    return '';
  },
};

export const changePost: GraphQLFieldConfig<null, Context> = {
  type: Post,
  args: {
    id: { type: UUIDType },
    dto: { type: ChangePostInputType },
  },
  async resolve(
    source,
    {
      id,
      dto,
    }: { id: string; dto: { title: string; content: string; authorId: string } },
    { prisma }: Context,
  ) {
    return prisma.post.update({ where: { id }, data: dto });
  },
};
