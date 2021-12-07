const { application, json } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo")
const authorize = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

const router = require("express").Router();

// registering
router.post("/register",validInfo, async (req,res) => {
    try {
        
        const {name, email, password} = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", [email]
        );

        if(user.rows.length !== 0){
            return res.status(401).json("User alraedy Exists")
        }
        // else{
        //     res.status(200).send("User can be created")
        // }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]
        );

        // res.json(newUser.rows[0])

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
})

// login route

router.post("/login",validInfo, async (req,res) => {
    try {
 
        const {email, password} = req.body;

        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", [email]
        );

        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        console.log("Valid Password", validPassword);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})

    } catch (err) {
        console.error(err)
    }
})

router.get("/is-verify", authorization ,(req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;