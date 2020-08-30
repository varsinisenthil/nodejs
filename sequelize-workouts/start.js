const Sequelize = require('sequelize')
const sequelize = new Sequelize('sequelizedb', 'root', 'Varsini123!', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
  //operatorsAliases: false
});

// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hn'
  });
});

var users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(35),
    allowNull: false,
    unique: true
  },
  passwd: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  favoriteColor: {
  	type: Sequelize.STRING(20),
  	allowNull: true,
  }
});
console.log(users)
users.sync({force: true}).then(function () {
  // Table created
  return users.create({
  	id : '123',
    username: 'John',
    passwd: 'Hn'
  });
});
// sequelize.model.users.findOne().then(function (user) {
//     console.log(users.get('username'));
// });

users.sync({force: true}).then(async function start() {
  // Table created
	const jane = await users.create({ username: "Jane", passwd: "Hjd", favoriteColor: "green" });
	console.log(jane.username); // "Jane"
	console.log(jane.favoriteColor); // "green"
	jane.username = "Jane II";
	jane.favoriteColor = "blue";
	await jane.save({ fields: ['username','favoriteColor'] });
	console.log(jane.username); // "Jane II"
	console.log(jane.favoriteColor); // "blue"
	// The above printed blue because the local object has it set to blue, but
	// in the database it is still "green":
	await jane.reload();
	console.log(jane.username); // "Jane II"
	console.log(jane.favoriteColor); // "green"
	var userss = await users.findAll({attributes: ['username', 'favoriteColor']});
	console.log(userss.every(user => users instanceof users)); // true
	console.log("All users:", JSON.stringify(userss, null, 2));
	var userss = await users.findAll({attributes: ['username', [sequelize.fn('COUNT', sequelize.col('favoriteColor')), 'n_favoriteColor'],'favoriteColor']});
	console.log(userss.every(user => users instanceof users)); // true
	console.log("All users:", JSON.stringify(userss, null, 2));
	var userss = await users.findAll({group: ['username']});
	console.log(userss.every(user => users instanceof users)); // true
	console.log("All users:", JSON.stringify(userss, null, 2));
	await users.update({ favoriteColor: "Black" }, {
    	where: {
    		favoriteColor: null
  		}
  	});
});