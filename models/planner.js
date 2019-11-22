
module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        len: [1-30]
      }
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false, 
      validate: {
        len:[1]
      }
    },
    categoery: {
      type: DataTypes.STRING, 
      defaultValue: "Work"
    }
  });
  return Plan;
};

