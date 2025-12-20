import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getPracticeAreas, createPracticeArea } from "../db";

export const practiceAreasRouter = router({
  // Listar áreas de atuação
  list: publicProcedure
    .query(async () => {
      const areas = await getPracticeAreas();
      return areas || [];
    }),

  // Criar área de atuação (apenas admin)
  create: protectedProcedure
    .input(
      z.object({
        titlePt: z.string().min(1),
        titleEn: z.string().optional(),
        descriptionPt: z.string().optional(),
        descriptionEn: z.string().optional(),
        icon: z.string().optional(),
        order: z.number().default(0),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verificar se é admin
      if ((ctx as any).user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can create practice areas");
      }

      return await createPracticeArea(input);
    }),
});
