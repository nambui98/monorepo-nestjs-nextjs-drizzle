import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import z from 'zod/v4';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export const updateUserSchema = createUpdateSchema(usersTable)
// .omit({id:true});
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type CreateUserDto = typeof usersTable.$inferInsert;
// export type UpdateUserDto = Partial<Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>>;
// export type UpdateUserDto = Partial<Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type InsertUserDto = z.infer<typeof insertUserSchema>;
export type UserResponse = typeof usersTable.$inferSelect;

