CREATE OR REPLACE FUNCTION FIND_USERS_AVAILABLE_ON(
CHOSEN_AVAILABILITY TEXT) RETURNS TABLE(LASTNAME CHARACTER 
VARYING, FIRSTNAME CHARACTER VARYING) LANGUAGE PLPGSQL 
AS 
	$$ -- DECLARE
	-- 	chosen_one text;
	BEGIN
	RETURN QUERY (
	        SELECT
	            candidate.lastname,
	            candidate.firstname
	        FROM "user"
	            INNER JOIN candidate ON candidate.id = "user".id
	            INNER JOIN candidate_degree ON candidate_degree.id_candidate = candidate.id
	            INNER JOIN degree ON degree.id = candidate_degree.id_degree
	            INNER JOIN user_availability ON user_availability.id_user = "user".id
	            INNER JOIN availability ON user_availability.id_availability = availability.id
	        WHERE
	            availability.availability = chosen_availability
	    );
	-- 	RETURN chosen_one;
END; 

$$;

DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE
    "user" (
        id SERIAL NOT NULL PRIMARY KEY,
        mail character varying(255) NOT NULL,
        password character varying(255) NOT NULL,
        active boolean NOT NULL,
        role character varying(255) NOT NULL,
        zip_code integer,
        city character varying(255),
        phone_number character varying(10),
        created_at date NOT NULL,
        updated_at date NOT NULL
    );

DROP TABLE IF EXISTS "admin" CASCADE;

CREATE TABLE
    "admin" (
        id INTEGER NOT NULL REFERENCES "user"(id) PRIMARY KEY,
        lastname character varying(255) NOT NULL,
        firstname character varying(255) NOT NULL
    );

DROP TABLE IF EXISTS "candidate" CASCADE;

CREATE TABLE
    "candidate" (
        id INTEGER NOT NULL REFERENCES "user"(id) PRIMARY KEY,
        lastname character varying(255) NOT NULL,
        firstname character varying(255) NOT NULL,
        birthdate date NOT NULL
    );

DROP TABLE IF EXISTS "company" CASCADE;

CREATE TABLE
    "company" (
        id INTEGER NOT NULL REFERENCES "user"(id) PRIMARY KEY,
        name character varying(255) NOT NULL,
        siret character varying(14) NOT NULL
    );

DROP TABLE IF EXISTS "availability" CASCADE;

CREATE TABLE
    "availability" (
        id SERIAL NOT NULL PRIMARY KEY,
        availability character varying(255) NOT NULL
    );

DROP TABLE IF EXISTS "user_availability" CASCADE;

CREATE TABLE
    "user_availability" (
        id_user INTEGER NOT NULL,
        id_availability INTEGER NOT NULL,
        FOREIGN KEY(id_user) REFERENCES "user"(id),
        FOREIGN KEY(id_availability) REFERENCES "availability"(id)
    );

DROP TABLE IF EXISTS "degree" CASCADE;

CREATE TABLE
    "degree" (
        id integer NOT NULL PRIMARY KEY,
        bafa boolean NOT NULL,
        bafa_ongoing boolean NOT NULL,
        internship boolean NOT NULL,
        bpjeps boolean NOT NULL
    );

DROP TABLE IF EXISTS "candidate_degree" CASCADE;

CREATE TABLE
    candidate_degree (
        id_candidate INTEGER NOT NULL,
        id_degree INTEGER NOT NULL,
        FOREIGN KEY(id_candidate) REFERENCES "candidate"(id),
        FOREIGN KEY(id_degree) REFERENCES "degree"(id)
    );

DROP TABLE IF EXISTS "token" CASCADE;

CREATE TABLE
    "token" (
        id INTEGER NOT NULL REFERENCES "user"(id) PRIMARY KEY,
        token character varying(255) NOT NULL
    );

INSERT INTO "availability" (availability) VALUES ('february');

INSERT INTO "availability" (availability) VALUES ('april');

INSERT INTO "availability" (availability) VALUES ('july');

INSERT INTO "availability" (availability) VALUES ('august');

INSERT INTO "availability" (availability) VALUES ('october');

INSERT INTO "availability" (availability) VALUES ('christmas');

INSERT INTO "availability" (availability) VALUES ('monday');

INSERT INTO "availability" (availability) VALUES ('tuesday');

INSERT INTO "availability" (availability) VALUES ('wednesday');

INSERT INTO "availability" (availability) VALUES ('thursday');

INSERT INTO "availability" (availability) VALUES ('friday');

INSERT INTO "availability" (availability) VALUES ('saturday');

INSERT INTO "availability" (availability) VALUES ('sunday');

INSERT INTO
    "user" (
        mail,
        password,
        active,
        role,
        zip_code,
        city,
        phone_number,
        created_at,
        updated_at
    )
VALUES (
        'user1@user.fr',
        'user',
        true,
        'candidate',
        62200,
        'Boulogne sur mer',
        '0783616435',
        '2022-10-12',
        '2022-10-12'
    );

INSERT INTO
    "user" (
        mail,
        password,
        active,
        role,
        zip_code,
        city,
        phone_number,
        created_at,
        updated_at
    )
VALUES (
        'user2@user.fr',
        'user',
        false,
        'candidate',
        62200,
        'Boulogne sur mer',
        '0783616435',
        '2022-10-12',
        '2022-10-12'
    );

INSERT INTO
    "user" (
        mail,
        password,
        active,
        role,
        zip_code,
        city,
        phone_number,
        created_at,
        updated_at
    )
VALUES (
        'comp1@user.fr',
        'comp',
        false,
        'company',
        62200,
        'Boulogne sur mer',
        '0783616435',
        '2022-10-12',
        '2022-10-12'
    );

INSERT INTO "token" (id, token)
VALUES (1, 'qsldklqskdazldsqldkqsmd');

INSERT INTO "token" (id, token)
VALUES (
        2,
        'qsldklqskdazldsqlqsdqsddkqsmd'
    );

INSERT INTO
    "user_availability" (id_user, id_availability)
VALUES (1, 6);

INSERT INTO
    "user_availability" (id_user, id_availability)
VALUES (1, 8);

INSERT INTO
    "user_availability" (id_user, id_availability)
VALUES (2, 6);

INSERT INTO
    "user_availability" (id_user, id_availability)
VALUES (2, 9);

INSERT INTO
    "candidate" (
        id,
        lastname,
        firstname,
        birthdate
    )
VALUES (1, 'Test', 'User', '2000-01-01');

INSERT INTO
    "candidate" (
        id,
        lastname,
        firstname,
        birthdate
    )
VALUES (
        2,
        'Test2',
        'User2',
        '2000-01-01'
    );

INSERT INTO "company" (id, name, siret) VALUES (3, 'Comp', 'Comp1');

INSERT INTO
    "degree" (
        id,
        bafa,
        bafa_ongoing,
        internship,
        bpjeps
    )
VALUES (1, true, false, false, false);

INSERT INTO
    "degree" (
        id,
        bafa,
        bafa_ongoing,
        internship,
        bpjeps
    )
VALUES (2, false, true, false, false);

INSERT INTO
    "candidate_degree" (id_candidate, id_degree)
VALUES (1, 1);

INSERT INTO
    "candidate_degree" (id_candidate, id_degree)
VALUES (2, 2);

SELECT find_users_available_on('christmas');