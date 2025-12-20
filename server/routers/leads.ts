import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { createLead, getLeads } from "../db";

export const leadsRouter = router({
  // Criar lead (formulário de contato)
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().optional(),
        source: z.string().default("contact_form"),
      })
    )
    .mutation(async ({ input }) => {
      return await createLead(input);
    }),

  // Listar leads (apenas admin)
  list: protectedProcedure
    .query(async ({ ctx }) => {
      // Verificar se é admin
      if ((ctx as any).user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can view leads");
      }

      const leads = await getLeads();
      return leads || [];
    }),
});
