-- Esquema inicial de GymIA para Supabase

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  age int,
  level text default 'Intermedio',
  goal text default 'Ganar músculo',
  days_per_week int default 4,
  minutes_per_workout int default 45,
  equipment text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists exercises (
  id bigint generated always as identity primary key,
  name text not null,
  muscle_group text,
  equipment text,
  created_at timestamptz default now()
);

create table if not exists workouts (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  workout_date date default current_date,
  completed boolean default false,
  created_at timestamptz default now()
);

create table if not exists workout_sets (
  id bigint generated always as identity primary key,
  workout_id bigint references workouts(id) on delete cascade,
  exercise_id bigint references exercises(id),
  set_number int,
  weight_kg numeric,
  reps int,
  created_at timestamptz default now()
);