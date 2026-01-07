import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { pgTable, serial, text as pgText, varchar as pgVarchar, integer as pgInteger, timestamp as pgTimestamp } from "drizzle-orm/pg-core";

// Note: Drizzle allows defining schemas for multiple databases. 
// Since we want to support both MySQL and PostgreSQL (Supabase), 
// we'll use a trick: we define the schema and the db.ts will handle the connection.
// For PostgreSQL, we need to ensure column names match the database.

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openid", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginmethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdat").defaultNow().notNull(),
  updatedAt: timestamp("updatedat").defaultNow().onUpdateNow().notNull(),
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
  createdAt: timestamp("createdat").defaultNow().notNull(),
  updatedAt: timestamp("updatedat").defaultNow().onUpdateNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

export const publications = mysqlTable("publications", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  content: text("content").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  tags: text("tags"),
  coverImage: varchar("coverimage", { length: 512 }),
  published: int("published").default(0).notNull(),
  publishedAt: timestamp("publishedat"),
  createdAt: timestamp("createdat").defaultNow().notNull(),
  updatedAt: timestamp("updatedat").defaultNow().onUpdateNow().notNull(),
});

export type Publication = typeof publications.$inferSelect;
export type InsertPublication = typeof publications.$inferInsert;

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  message: text("message"),
  source: varchar("source", { length: 100 }),
  createdAt: timestamp("createdat").defaultNow().notNull(),
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
  createdAt: timestamp("createdat").defaultNow().notNull(),
  updatedAt: timestamp("updatedat").defaultNow().onUpdateNow().notNull(),
});

export type PracticeArea = typeof practiceAreas.$inferSelect;
export type InsertPracticeArea = typeof practiceAreas.$inferInsert;
