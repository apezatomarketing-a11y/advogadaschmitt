import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getAdminByEmail, verifyPassword, createAdminUser, hashPassword } from "../db";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const admin = await getAdminByEmail(input.email);

      if (!admin || !admin.passwordHash || !verifyPassword(input.password, admin.passwordHash)) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou senha inválidos",
        });
      }

      if (!admin.active) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Conta desativada",
        });
      }

      return {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        token: Buffer.from(`${admin.id}:${admin.email}`).toString("base64"),
      };
    }),

  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(3),
      })
    )
    .mutation(async ({ input }) => {
      const existingAdmin = await getAdminByEmail(input.email);

      if (existingAdmin) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email já cadastrado",
        });
      }

      const admin = await createAdminUser(input.email, input.password, input.name);

      if (!admin) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar usuário",
        });
      }

      return {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        token: Buffer.from(`${admin.id}:${admin.email}`).toString("base64"),
      };
    }),
});
