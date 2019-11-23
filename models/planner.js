
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
      type: DataTypes.STRING,
      defaultValue: "Work"
    },
    frequency: {
      type: DataTypes.STRING,
      defaultValue: "Once"  
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
    }
  });
  return Plan;
};

