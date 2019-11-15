DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_hash;
DROP TABLE IF EXISTS posts;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR,
    profile_img TEXT
);

CREATE TABLE users_hash (
    hash_id SERIAL PRIMARY KEY,
    hash TEXT,
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(40),
    img_url TEXT,
    content TEXT,
    user_id INT REFERENCES users(user_id)
);

INSERT INTO users (email, profile_img)
VALUES
('email', 'https://robohash.org/111'),
('email2', 'https://robohash.org/222');

INSERT INTO posts (title, img_url, content, user_id)
VALUES
('Title1', 'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg', 'Look at this picture!', 1),
('Title2', 'https://www.bigstockphoto.com/images/homepage/module-6.jpg', 'Look at this one Too!', 2);

INSERT INTO users_hash (hash, user_id)
VALUES ('password', 1),
('s3cret', 2);

