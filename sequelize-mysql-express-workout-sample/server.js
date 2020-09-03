const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Varsini application." });
});

// Sync the database
const db = require("./models");
db.sequelize.sync();

// Include Router
const router = express.Router()
app.use("/api",router);

// get all users
router.get("/all", (req, res) => {
  db.MyUser.findAll().then(MyUser => res.send(MyUser));
});

// get single User by id
router.get("/find/:id", (req, res) => {
  db.MyUser.findAll({
    where: {
      id: req.params.id
    }
  }).then(submitedUser => res.send(submitedUser));
});

// post new user
router.post("/new", (req, res) => {
  db.MyUser.create({
    first_name: req.body.first_name,
    colour: req.body.colour
  }).then(submitedUser => res.send(submitedUser));
});

// delete user
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.MyUser.destroy({
    where: {
      id: id
    }
  }).then(num => {
      if (num == 1) {
        res.send({
          message: id + " was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
});

// edit a user
router.put("/edit", (req, res) => {
  db.MyUser.update(
    {
      first_name: req.body.replace_name
    },
    {
      where: { first_name: req.body.first_name }
    }
  ).then(() => res.send("success"));
});

//module.exports = router;

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});