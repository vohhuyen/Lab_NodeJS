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
        username: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        hashedPassword: {
          type: DataTypes.STRING(64),
          validate: {
            is: /^[0-9a-f]{64}$/i,
          },
        },
      });
      

    //   allow null
      (async () => {
        await sequelize.sync({ force: true });
        User.init(
            {
              username: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                  len: [5, 10],
                },
              },
            },
            { sequelize },
          );
      })();
}


