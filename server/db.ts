import { eq } from "drizzle-orm";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, publications, InsertPublication, leads, InsertLead, practiceAreas, InsertPracticeArea, adminUsers, AdminUser } from "../drizzle/schema";
import { ENV } from './_core/env';
import * as crypto from 'crypto';

let _db: any = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const url = process.env.DATABASE_URL;
      if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
        console.log("[Database] Connecting to PostgreSQL (Supabase)...");
        const queryClient = postgres(url);
        _db = drizzlePostgres(queryClient);
      } else {
        console.log("[Database] Connecting to MySQL...");
        _db = drizzleMysql(url);
      }
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: any = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // Handle different syntax for MySQL and PostgreSQL
    if (process.env.DATABASE_URL?.startsWith("postgres")) {
      await db.insert(users).values(values).onConflictDoUpdate({
        target: users.openId,
        set: updateSet,
      });
    } else {
      await db.insert(users).values(values).onDuplicateKeyUpdate({
        set: updateSet,
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Funções para Publicações
export async function createPublication(data: InsertPublication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(publications).values(data);
  return result;
}

export async function getPublications(published?: boolean) {
  const db = await getDb();
  if (!db) return [];
  const query = published !== undefined 
    ? db.select().from(publications).where(eq(publications.published, published ? 1 : 0))
    : db.select().from(publications);
  return query;
}

export async function getPublicationBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(publications).where(eq(publications.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPublicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(publications).where(eq(publications.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updatePublication(id: number, data: Partial<InsertPublication>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(publications).set(data).where(eq(publications.id, id));
  return result;
}

export async function deletePublication(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.delete(publications).where(eq(publications.id, id));
  return result;
}

// Funções para Leads
export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(leads).values(data);
  return result;
}

export async function getLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(leads);
}

// Funções para Áreas de Atuação
export async function getPracticeAreas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(practiceAreas).orderBy(practiceAreas.order);
}

export async function createPracticeArea(data: InsertPracticeArea) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(practiceAreas).values(data);
  return result;
}

// Admin authentication
export async function createAdminUser(email: string, password: string, name: string): Promise<AdminUser | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin user: database not available");
    return null;
  }

  try {
    const passwordHash = hashPassword(password);
    await db.insert(adminUsers).values({
      email,
      passwordHash,
      name,
      active: 1,
    });
    
    const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create admin user:", error);
    return null;
  }
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin user: database not available");
    return null;
  }

  const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + (process.env.JWT_SECRET || 'secret')).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
