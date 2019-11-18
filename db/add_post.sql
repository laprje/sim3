INSERT INTO posts (title, img_url, content, user_id)
VALUES
($1, $2, $3, $4);

SELECT * FROM posts;