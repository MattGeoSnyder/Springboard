import { integer, pgTable, pgEnum, serial, uniqueIndex, varchar, date, references, json} from drizzle-orm/pg-core

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', {length: 20} ).unique(),
	name: varchar('name', {length: 25}),
	birthday: date('birthday'),
	unit_height: integer('unit_height'),
	unit_weight: integer('unit_weight'),
	height_units: pgEnum('height_units', ['cm', 'in']),
	weight_units: pgEnum('weight_units', ['kg', 'lb']),
})

export const templates = pgTable('templates', {
	id: serial('id').primaryKey(),
	name: varchar('name', {length: 25}),
	user_id: integer('user_id').references(() => users.id),
	exercises: integer('exercises').references(() => temp_exercises.id),
})

export const temp_exercises = pgTable('temp_exercises', {
	id: serial('id').primaryKey(),
	exercise_name: varchar('name', {length: 25}),
	exercise_id: integer('exercise_id').references(() => exercises.id),
	muscle_group_id: integer('muscle_group_id').references(() => muscle_groups.id),
})

export const muscle_groups = pgTable('muscle_groups', {
	id: serial('id').primaryKey(),
	muscle_group_name: varchar('name', {length: 25}),
})

export const workouts = pgTable('workouts', 
{
	id: serial('id').primaryKey(),
	name: varchar('name', {length: 25}),
	user_id: integer('user_id').references(() => users.id),
	scheduled_date: date('scheduled_date'),
	complete_date: date('complete_date'),
	exercise_list: json('exercise_list'),
})

export const sets = pgTable('sets', {
	id: serial('id').primaryKey(),
	reps: integer('reps'),
	weight: integer('weight'),
	exercise_id: integer('exercise_id').references(() => exercises.id),
	workout_id: integer('workout_id').references(() => workouts.id),
})

