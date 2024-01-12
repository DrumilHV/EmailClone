-- USERS data base Schema

CREATE TABLE USERS(
    email VARCHAR(50) PRIMARY KEY,
    pass text
);

----------------------------------

-- TEST USERS


-- users 
-- "drumil@gmail.com" 
-- 123
-- "drumil1@gmail.com"
-- 1234 


----------------------------------
-- EMAILS
CREATE TABLE EMAILS(
    origin VARCHAR(50) REFERENCES USERS(email),
    dest VARCHAR(50) REFERENCES   USERS(email),
    sentat TIMESTAMP, 
    content text,
    id UUID  PRIMARY KEY DEFAULT gen_random_uuid() 
);


---------------------------------- 
-- TEST MAILS



-- INSERT INTO EMAILS(origin, dest, content) values ("drumil@gmail.com", "drumil1@gmail.com", "Hi , how are you ?");
-- INSERT INTO EMAILS(origin, dest, content) values ("drumil1@gmail.com", "drumil@gmail.com", "I am good  , how are you ?");


----------------------------------

