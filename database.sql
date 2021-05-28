DATABASE NAME = T2W9_ToDoList;

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (260) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("name", "complete") 
VALUES 
	('Wake Up', 'false'),
	('Grab a brush & put on a little make-up', 'false');

SELECT * FROM "tasks";