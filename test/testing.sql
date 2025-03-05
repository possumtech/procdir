-- QUERY: howdyWorld
SELECT CONCAT('Howdy, ', COALESCE($1, 'world'), '!') AS greeting;
-- STOP

-- PROCEDURE: procDirInit
CREATE OR REPLACE PROCEDURE procDirInit (INTEGER) LANGUAGE plpgsql AS $$
BEGIN

CREATE TABLE IF NOT EXISTS procDir (numbers INTEGER);

INSERT INTO procDir (numbers) VALUES ($1);

$$;
-- STOP
