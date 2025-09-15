import { pgTable, serial, integer, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../utils";

export const bookingOrder = pgTable("booking_order", {
  id: serial("id").primaryKey(),

  guests: integer("guests").notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),

  status: text("status").notNull().default("pending"),

  ...timestamps
});
