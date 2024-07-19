import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const accountRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.bankAccount.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        balance: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.bankAccount.create({
        data: {
          name: input.name,
          balance: input.balance,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
