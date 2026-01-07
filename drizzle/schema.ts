import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

// Sincronizado com as tabelas existentes do usuário no Supabase (snake_case)

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openid", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginmethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("lastsignedin").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("passwordhash").notNull(),
  name: text("name"),
  active: int("active").default(1).notNull(),
  role: varchar("role", { length: 20 }).default("editor").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

// Usando blog_posts conforme as tabelas existentes do usuário
export const publications = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  featuredImage: varchar("featured_image", { length: 512 }),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Publication = typeof publications.$inferSelect;
export type InsertPublication = typeof publications.$inferInsert;

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("whatsapp", { length: 20 }), // Mapeado para whatsapp conforme tabela do usuário
  message: text("message"),
  source: varchar("source", { length: 100 }),
  status: varchar("status", { length: 20 }).default("novo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

export const practiceAreas = mysqlTable("practice_areas", {
  id: int("id").autoincrement().primaryKey(),
  titlePt: varchar("titlept", { length: 255 }).notNull(),
  titleEn: varchar("titleen", { length: 255 }),
  descriptionPt: text("descriptionpt"),
  descriptionEn: text("descriptionen"),
  icon: varchar("icon", { length: 100 }),
  order: int("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type PracticeArea = typeof practiceAreas.$inferSelect;
export type InsertPracticeArea = typeof practiceAreas.$inferInsert;
