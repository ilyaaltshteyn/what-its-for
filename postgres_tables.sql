create table tag (
    id SERIAL PRIMARY KEY,
    name VARCHAR(512) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    icon_name VARCHAR(255) NOT NULL
);

create table wif (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tag_id INTEGER NOT NULL REFERENCES tag(id),
    CONSTRAINT name_tag UNIQUE (name, tag_id)
);

create table explanation (
    id SERIAL PRIMARY KEY,
    wif_id INTEGER REFERENCES wif(id),
    tag1_id INTEGER NOT NULL REFERENCES tag(id),
    tag2_id INTEGER REFERENCES tag(id),
    tag3_id INTEGER REFERENCES tag(id),
    text VARCHAR(5000) NOT NULL,
    title VARCHAR(512) NOT NULL,
    approved_flag BOOLEAN
);

CREATE TYPE vote_direction AS ENUM ('upvote', 'downvote');

create table vote (
    id SERIAL PRIMARY KEY,
    explanation_id INTEGER REFERENCES explanation(id),
    direction vote_direction,
    received_on TIMESTAMP default current_timestamp,
    sender_ip varchar(15)
);

-- Insert some test explanations for wif_id = 3
insert into explanation
(wif_id, tag1_id, tag2_id, tag3_id, text, title, approved_flag)
values
(3, 1, null, null, 'A software used for storing data that has a structured format (i.e. rows and columns). Postgres stores data in tables, and each table has rows and columns. Each column has a pre-defined data type (for example: integer data, or boolean data). Rows in separate tables can be related to one another by a common ID column, which allows different tables to be joined into a side-by-side result. Postgres is most often used as part of a software application, where data needs to be stored in a structured format. One example is...', 'A software for storing data in row/column format.', true),
(3, 1, null, null, 'A database software that I dont want to put much info about.', 'A relational database', true);

-- get all approved explanations for wif 3
select
explanation.tag1_id,
explanation.tag2_id,
explanation.tag3_id,
explanation.text
from explanation
where wif_id = 3 and approved_flag = true