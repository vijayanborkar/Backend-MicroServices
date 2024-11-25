module.exports = (sequelize, DataTypes) => {
  const tour = sequelize.define(
    "tour",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  tour.associate = (models) => {
    tour.hasMany(models.tourItem, {
      foreignKey: "tourId",
      as: "tourItems",
      onDelete: "CASCADE",
    });
  };

  return tour;
};
