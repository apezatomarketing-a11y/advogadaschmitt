import { eq } from "drizzle-orm";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../drizzle/schema";
import { ENV } from './_core/env';
import * as crypto from 'crypto';

const { users, publications, leads, practiceAreas, adminUsers } = schema;

let _db: any = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const url = process.env.DATABASE_URL;
      if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
        const queryClient = postgres(url);
        _db = drizzlePostgres(queryClient);
      } else {
        _db = drizzleMysql(url);
      }
    } catch (error) {
      console.error("[Database] Connection error:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: schema.InsertUser): Promise<void> {
  const db = await getDb();
  if (!db || !user.openId) return;

  const values: any = { openId: user.openId };
  const updateSet: Record<string, any> = {};

  ["name", "email", "loginMethod"].forEach((field) => {
    const val = (user as any)[field];
    if (val !== undefined) {
      values[field] = val ?? null;
      updateSet[field] = val ?? null;
    }
  });

  if (user.lastSignedIn) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }

  if (process.env.DATABASE_URL?.startsWith("postgres")) {
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } else {
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function createPublication(data: schema.InsertPublication) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.insert(publications).values(data);
}

export async function getPublications(published?: boolean) {
  const db = await getDb();
  if (!db) return [];
  const query = published !== undefined 
    ? db.select().from(publications).where(eq(publications.status, published ? 'published' : 'draft'))
    : db.select().from(publications);
  return query;
}

export async function getPublicationBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(publications).where(eq(publications.slug, slug)).limit(1);
  return result[0];
}

export async function getPublicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(publications).where(eq(publications.id, id)).limit(1);
  return result[0];
}

export async function updatePublication(id: number, data: Partial<schema.InsertPublication>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(publications).set(data).where(eq(publications.id, id));
}

export async function deletePublication(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.delete(publications).where(eq(publications.id, id));
}

export async function createLead(data: schema.InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.insert(leads).values(data);
}

export async function getLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads);
}

export async function getPracticeAreas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(practiceAreas).orderBy(practiceAreas.order);
}

export async function getAdminByEmail(email: string): Promise<schema.AdminUser | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return result[0] || null;
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + (process.env.JWT_SECRET || 'secret')).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export async function createAdminUser(email: string, password: string, name: string) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  
  const data: schema.InsertAdminUser = {
    email,
    passwordHash: hashPassword(password),
    name,
    active: 1,
    role: "admin",
  };
  
  const result = await db.insert(adminUsers).values(data);
  // Para MySQL/Postgres o retorno do insert pode variar, vamos buscar o usuário criado
  return getAdminByEmail(email);
}

export async function createPracticeArea(data: any) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  
  // Mapear campos do input para o schema
  const insertData: schema.InsertPracticeArea = {
    title: data.titlePt,
    description: data.descriptionPt,
    icon: data.icon,
    order: data.order,
    active: 1,
  };
  
  return db.insert(practiceAreas).values(insertData);
}
