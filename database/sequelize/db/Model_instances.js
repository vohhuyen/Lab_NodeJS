const sequelize = require('./connectdb');
const { DataTypes, Model } = require('sequelize');

async function demoDB() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      createModles(sequelize)
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}
demoDB();

  async function createModles(sequelize) {
  const User = sequelize.define('user', {
    name: DataTypes.TEXT,
    favoriteColor: {
      type: DataTypes.TEXT,
      defaultValue: 'green',
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
  });
  

  // creating an instances
  (async () => {
    await sequelize.sync({ force: true });
    const jane = User.build({ name: 'Jane' });
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"
    await jane.save();
    console.log('Jane was SAVED to the database!');
  })();
  

   // Updating an instance
  (async () => {
    await sequelize.sync({ force: true });
    const jane = await User.create({ name: 'Jane' });
    jane.favoriteColor = 'blue';
    await jane.update({ name: 'Ada' });
    await jane.save();
    console.log('Jane was UPDATED to the database!');
  })();


  // Deleting an instance
  (async () => {
    await sequelize.sync({ force: true });
    const jane = await User.create({ name: 'Jane' });
    console.log(jane.name); // "Jane"
    await jane.destroy();
    console.log('Jane was DESTROY to the database!');
  })();


  //  Reloading an instance
  (async () => {
    await sequelize.sync({ force: true });
    const jane = await User.create({ name: 'Jane' });
    console.log(jane.name); // "Jane"
    jane.name = 'Ada';
    // the name is still "Jane" in the database
    await jane.reload();
    console.log(jane.name);
    console.log('Jane was RELOADING to the database!');
  })();


  // Saving only some fields
  (async () => {
    await sequelize.sync({ force: true });
    const jane = await User.create({ name: 'Jane' });
    console.log(jane.name); // "Jane"
    console.log(jane.favoriteColor); // "green"
    jane.name = 'Jane II';
    jane.favoriteColor = 'blue';
    await jane.save({ fields: ['name'] });
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "blue"
    // The above printed blue because the local object has it set to blue, but
    // in the database it is still "green":
    await jane.reload();
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "green"
    console.log('Jane was SAVING ONLY SOME FIELDS to the database!');
  })();


  // Incrementing and decrementing integer values
  (async () => {
    await sequelize.sync({ force: true });
    const jane = await User.create({ name: 'Jane', age: 100, cash: 5000 });
    await jane.increment({
      age: 2,
      cash: 100,
    });

    // If the values are incremented by the same amount, you can use this other syntax as well:
    await jane.increment(['age', 'cash'], { by: 2 });
    console.log('Jane was INCREAMENT to the database!');
  })();
}


