import { TodoSchema } from "~/schemas/Todo";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const todoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(TodoSchema.omit({ id: true }))
    .output(TodoSchema)
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.db.todo.create({
        data: {
          ...input,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
        select: { id: true, title: true, isComplete: true },
      });

      return todo;
    }),

  getOwn: protectedProcedure
    .output(TodoSchema.array())
    .query(async ({ ctx }) => {
      return ctx.db.todo.findMany({
        where: { createdBy: { id: ctx.session.user.id } },
        select: { id: true, title: true, isComplete: true },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        ...TodoSchema.partial().shape,
        ...TodoSchema.pick({ id: true }).shape,
      }),
    )
    .output(TodoSchema)
    .mutation(async ({ ctx, input: { id, ...input } }) => {
      const todo = await ctx.db.todo.findUniqueOrThrow({
        where: { id },
        select: { createdBy: { select: { id: true } } },
      });

      if (todo.createdBy.id !== ctx.session.user.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.db.todo.update({
        where: { id },
        data: input,
      });
    }),
});
