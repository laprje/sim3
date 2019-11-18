SELECT post_id, posts.user_id, email, profile_img, title, img_url, content FROM users
JOIN posts ON posts.user_id = users.user_id
WHERE posts.user_id = $1;