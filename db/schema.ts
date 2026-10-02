import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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
  committeeName: text("committee_name"),
  position: text("position"), // "Head", "Vice Head", or "Member"
  photoUrl: text("photo_url"),
  linkedin: text("linkedin"),
});

export const committeeTasks = pgTable("committee_tasks", {
  id: serial("id").primaryKey(),
  committeeName: text("committee_name").notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const board = pgTable("board", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  linkedin: text("linkedin"),
});