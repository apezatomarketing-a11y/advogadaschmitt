import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  createPublication,
  getPublications,
  getPublicationBySlug,
  getPublicationById,
  updatePublication,
  deletePublication,
} from "../db";

export const publicationsRouter = router({
  // Listar publicações públicas
  list: publicProcedure
    .query(async () => {
      const pubs = await getPublications(true);
      return pubs || [];
    }),

  // Obter publicação por slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getPublicationBySlug(input.slug);
    }),

  // Obter publicação por ID (para admin)
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getPublicationById(input.id);
    }),

  // Criar publicação (apenas admin)
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        content: z.string().min(1),
        author: z.string().min(1),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.number().default(0),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async (opts: any) => {
      const { input, ctx } = opts;
      // Verificar se é admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can create publications");
      }

      return await createPublication({
        ...input,
        publishedAt: input.publishedAt || new Date(),
      });
    }),

  // Atualizar publicação (apenas admin)
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        tags: z.string().optional(),
        coverImage: z.string().optional(),
        published: z.number().optional(),
        publishedAt: z.date().optional(),
      })
    )
    .mutation(async (opts: any) => {
      const { input, ctx } = opts;
      // Verificar se é admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can update publications");
      }

      const { id, ...data } = input;
      return await updatePublication(id, data);
    }),

  // Deletar publicação (apenas admin)
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts: any) => {
      const { input, ctx } = opts;
      // Verificar se é admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can delete publications");
      }

      return await deletePublication(input.id);
    }),

  // Listar todas as publicações (incluindo drafts) - apenas admin
  listAll: protectedProcedure
    .query(async (opts: any) => {
      const { ctx } = opts;
      // Verificar se é admin
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized: only admins can view all publications");
      }

      const pubs = await getPublications();
      return pubs || [];
    }),
});
