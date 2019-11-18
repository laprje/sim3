const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;
        const found = await db.find_user([email])
        if (+found[0].count !== 0) {
          return res.status(409).send({ message: "Email already registered" });
        }
        const user_id = await db.add_user({
          email,
          profile_img: `https://robohash.org/${email}`
        })
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        db.add_hash({ user_id: user_id[0].user_id, hash });
        req.session.user = {
          user_id: user_id[0].user_id,
          email,
          profile_img: `https://robohash.org/${email}`
        };
        console.log(req.session.user)
        res.status(201).send({ message: "Logged In", user: req.session.user });
      },

      login: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;
        const found = await db.find_user([email]);
        if (+found[0].count === 0) {
          return res
            .status(401)
            .send({ message: "An account with that email does not exist" });
        }
        const foundUser = await db.find_hash([email]);
        const { hash, user_id, profile_img } = foundUser[0];
        const result = bcrypt.compareSync(password, hash);
        if (!result) {
          return res.status(401).send({ message: "Password incorrect" });
        }
        req.session.user = { user_id, email, profile_img };
        console.log(req.session.user)
        res.status(200).send({ message: "Logged In", user: req.session.user });
      },

      logout: (req, res) => {
          req.session.destroy();
          res.status(200).send({Message: "Logged Out."})
      },

      getSession: (req, res) => {
        if (req.session.user) {
          res.status(200).send(req.session.user)
        }
      },

      getAllPosts: (req, res) => {
          const db = req.app.get('db');
          const { title, img_url_url, content, user_id } = req.body

          db.get_all_posts([title, img_url_url, content, user_id])
            .then(posts => {
                res.status(200).send(posts)
            })
            .catch(err => {
                res.status(500).send("Something went wrong.")
                console.log(err)
            })
      },

      // getSearchAndMyPosts: (req, res) => {
      //     const db = req.app.get('db');
      //     const {title, img_url_url, content, user_id} = req.body
          
      // },

      getUser: (req, res) => {
        const {email, profile_img} = req.session.user
        const db = req.app.get('db')
        db.get_user([email, profile_img])
        .then(user => {
          res.status(200).send(user)
        })
        .catch(err => {
          console.log(err)
        })
      },

      addPost: (req, res) => {
        const {user_id} = req.session.user
        const {title, img_url, content} = req.body
        const db = req.app.get("db")
        db.add_post([title, img_url, content, user_id])
        .then((result) => {
          res.status(201).send({message: 'Post Submitted', result: result})
        })
        .catch(err => res.status(417).send({message: 'Something went wrong'}))
      },
      // allPosts: (req, res) => {
        
        
      //   const db = req.app.get("db")
      //   db.all_posts()
      //   .then(result => res.status(200).send(result))
      // },
      getPost: (req, res) => {
        const db = req.app.get("db")
        db.get_post(req.params.post_id)
        .then(result => {
         let data = result[0]
          res.status(200).send(data)
        })
      },
      editPost: (req, res) => {
        const {content, post_id, img_url, title} = req.body
        const db = req.app.get("db")
        db.edit_post([content, img_url, title, post_id])
          .then((result) => res.status(200).send({post: result, message: 'Post Updated' }))
          .catch(err => res.status(417).send({err: err, message: 'Something went wrong' }))
      },
      getNonUserPosts: (req, res) => {
        const db = req.app.get('db')
        db.get_non_user_posts(req.params.user_id)
        .then(result => {
          res.status(200).send(result)
        })
      }

    }
