INSERT INTO users ( email, profile_img)
VALUES
( ${email}, ${profile_img} )
RETURNING *;