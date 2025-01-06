// models/weeklyShift.js
module.exports = (sequelize, DataTypes) => {
    const WeeklyShift = sequelize.define("WeeklyShift", {
      employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      monday_start: DataTypes.TIME,
      monday_end: DataTypes.TIME,
      tuesday_start: DataTypes.TIME,
      tuesday_end: DataTypes.TIME,
      wednesday_start: DataTypes.TIME,
      wednesday_end: DataTypes.TIME,
      thursday_start: DataTypes.TIME,
      thursday_end: DataTypes.TIME,
      friday_start: DataTypes.TIME,
      friday_end: DataTypes.TIME,
      saturday_start: DataTypes.TIME,
      saturday_end: DataTypes.TIME,
      sunday_start: DataTypes.TIME,
      sunday_end: DataTypes.TIME,
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    });
  
    return WeeklyShift;
  };
  