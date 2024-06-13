const sequelize = require('./connectdb');
const { DataTypes, Model } = require('sequelize');


async function demoDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        ModlesQuery(sequelize)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  demoDB();

async function ModlesQuery(sequelize){
    const User = sequelize.define('user', {
        name: DataTypes.TEXT,
        favoriteColor: {
          type: DataTypes.TEXT,
          defaultValue: 'green',
        },
        age: DataTypes.INTEGER,
        cash: DataTypes.INTEGER,
      });


    //   insert
    const user = await User.create(
        {
          name: 'alice123',
          age: 18
        },
        { fields: ['name'] },
      );
      // let's assume the default of isAdmin is false
      console.log(user.name); // 'alice123'
      console.log(user.age);


    //   select
      const users = await User.findAll();
        console.log(users.every(user => user instanceof User)); // true
        console.log('All users:', JSON.stringify(users, null, 2));

    // where
    const user1 = await User.findAll({
        where: {
          id: 2,
        },
      });
    console.log('All users where id = 2:', JSON.stringify(user1, null, 2));


    // update
    await User.update(
        { age: 18 },
        {
          where: {
            age: null,
          },
        },
      );


    
    // delete
    await User.destroy({
        where: {
          name: 'alice123',
        },
      });

    // increment, decrement
    await User.increment({ age: 5 }, { where: { id: 1 } }); // Will increase age to 15
    await User.increment({ age: -5 }, { where: { id: 2 } });
    
}
