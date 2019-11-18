UPDATE posts
SET content = $1,
img_url = $2,
title = $3
WHERE posts.post_id = $4

SELECT posts.user_id, posts.post_id, email, profile_img, title, img_url, content FROM users
JOIN posts ON posts.user_id = users.user_id
where posts.user_id = $4