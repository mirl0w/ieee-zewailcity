import {pgTable, serial, text, timestamp} from "drizzle-orm/pg-core";
export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    date: timestamp("date").notNull(),
    location: text("location"),
    imageUrl: text("image_url"),
    registrationLink: text("registration_link"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const committee = pgTable("committee", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    role: text("role").notNull(),
    PhotoUrl: text("photo_url"),
    linkedin: text("linkedin"),
});