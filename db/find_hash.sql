SELECT * FROM users u
JOIN users_hash uh ON u.user_id = uh.user_id
WHERE email = $1;