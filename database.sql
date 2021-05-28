DATABASE NAME = T2W9_ToDoList;

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (260) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("name") 
VALUES 
	('Wake Up'),
	('Grab a brush & put on a little make-up'),
  ('Hide the scars to fade away the shake-up'),
  ('Why''d you leave the keys upon the table?');

SELECT * FROM "tasks";