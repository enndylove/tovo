CREATE TYPE booking_order_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE "booking_order" (
  "id" serial PRIMARY KEY NOT NULL,
  "guests" integer NOT NULL,
  "date" varchar(50) NOT NULL,
  "time" varchar(50) NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(150) NOT NULL,
  "status" booking_order_status DEFAULT 'pending' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
