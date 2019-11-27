
module.exports = function (sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1 - 30]
      }
    },
    type: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eventDate: {
      type: DataTypes.STRING,
    }
  });
  return Plan;
};

