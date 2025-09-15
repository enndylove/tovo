import { pgTable, serial, integer, varchar, pgEnum } from "drizzle-orm/pg-core";
import { timestamps } from "../utils";

export const BookingOrderStatus = pgEnum("booking_order_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookingOrder = pgTable("booking_order", {
  id: serial("id").primaryKey(),

  guests: integer("guests").notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  price: integer("price").notNull().default(650),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),

  status: BookingOrderStatus("status").notNull().default("pending"),

  ...timestamps
});

export type BookingOrder = typeof bookingOrder.$inferSelect;
export type NewBookingOrder = typeof bookingOrder.$inferInsert;
