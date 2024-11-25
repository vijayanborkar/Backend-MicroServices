module.exports = (sequelize, DataTypes) => {
  const tourItem = sequelize.define(
    "tourItem",
    {
      tourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tours",
          key: "id",
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );

  tourItem.associate = (models) => {
    tourItem.belongsTo(models.tour, { foreignKey: "tourId" });
  };

  return tourItem;
};
