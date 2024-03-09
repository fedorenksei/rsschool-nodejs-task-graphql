import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import { gqlSchema } from './gqlSchema.js';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler({ body: { query, variables } }) {
      const errors = validate(gqlSchema, parse(query), [depthLimit(5)]);
      if (errors.length) return { errors };

      return await graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma: fastify.prisma },
      });
    },
  });
};

export default plugin;
