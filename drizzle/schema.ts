import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

// Sincronizado com as tabelas existentes do usuário no Supabase (snake_case)
// Usando pgTable para compatibilidade total com PostgreSQL/Supabase

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openid", { length: 64 }).unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginmethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastSignedIn: timestamp("lastsignedin").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("passwordhash"),
  name: text("name"),
  active: integer("active").default(1),
  role: varchar("role", { length: 20 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// Usando blog_posts conforme as tabelas existentes do usuário
export const publications = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  featuredImage: varchar("featured_image", { length: 512 }),
  author: text("author").default("Dra. Vieira Schmitt"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Publication = typeof publications.$inferSelect;
export type InsertPublication = typeof publications.$inferInsert;

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("whatsapp", { length: 20 }), // Mapeado para whatsapp conforme tabela do usuário
  message: text("message"),
  status: varchar("status", { length: 20 }).default("novo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

export const practiceAreas = pgTable("practice_areas", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  order: integer("sort_order").default(0),
  active: integer("active").default(1),
});

export type PracticeArea = typeof practiceAreas.$inferSelect;
export type InsertPracticeArea = typeof practiceAreas.$inferInsert;
