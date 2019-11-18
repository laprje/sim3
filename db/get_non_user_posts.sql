SELECT posts.user_id, posts.post_id, email, profile_img, content FROM users
JOIN posts ON posts.user_id = users.user_id
WHERE users.user_id != $1;