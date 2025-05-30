import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    boolean,
    pgEnum,
    text,
} from 'drizzle-orm/pg-core';
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import z from 'zod/v3';

export const practiceTypeEnum = pgEnum('practice_type', [
    'accountancy_practice',
    'bookkeeping_service',
    'tax_advisory_firm',
]);

export type PracticeType = (typeof practiceTypeEnum.enumValues)[number];

export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    phoneNumber: varchar('phone_number', { length: 50 }),
    jobTitle: varchar('job_title', { length: 150 }),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    practiceType: practiceTypeEnum('practice_type').default(
        'accountancy_practice',
    ),
    hmrcConnected: boolean('hmrc_connected').default(false),
    agentReferenceNumber: varchar('agent_reference_number', { length: 20 }), // ARN
    utr: varchar('utr', { length: 10 }), // Unique Taxpayer Reference
    nino: varchar('nino', { length: 9 }), // National Insurance Number
    hmrcGatewayCredentials: text('hmrc_gateway_credentials'), // JSON stored credentials
    authorityToAct: boolean('authority_to_act').default(false),
    hmrcConnectedAt: timestamp('hmrc_connected_at'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export const updateUserSchema = createUpdateSchema(usersTable);
// .omit({id:true});
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type CreateUserDto = typeof usersTable.$inferInsert;
// export type UpdateUserDto = Partial<Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>>;
// export type UpdateUserDto = Partial<Omit<typeof usersTable.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type InsertUserDto = z.infer<typeof insertUserSchema>;
export type UserResponse = typeof usersTable.$inferSelect;
