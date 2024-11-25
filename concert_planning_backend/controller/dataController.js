const {
  afterParties: AfterPartiesModel,
  concert: ConcertModel,
  merchandiseStalls: MerchandiseStallsModel,
  tour: TourModel,
  tourItem: TourItemModel,
} = require("../models");

const createTour = async (req, res) => {
  try {
    const { concerts, merchandiseStalls, afterParties, name } = req.body;
    const newTour = await TourModel.create({ name });
    if (concerts && concerts.length > 0) {
      for (const concert of concerts) {
        const savedConcert = await ConcertModel.create(concert);
        await TourItemModel.create({
          tourId: newTour.id,
          itemId: savedConcert.id,
          type: "concert",
        });
      }
    }

    if (afterParties && afterParties.length > 0) {
      for (const afterParty of afterParties) {
        const savedAfterParty = await AfterPartiesModel.create(afterParty);
        await TourItemModel.create({
          tourId: newTour.id,
          itemId: savedAfterParty.id,
          type: "afterParty",
        });
      }
    }

    if (merchandiseStalls && merchandiseStalls.length > 0) {
      for (const merchandiseStall of merchandiseStalls) {
        const savedMerchandiseStall = await MerchandiseStallsModel.create(
          merchandiseStall
        );
        await TourItemModel.create({
          tourId: newTour.id,
          itemId: savedMerchandiseStall.id,
          type: "merchandiseStall",
        });
      }
    }
    res.status(201).json({ message: "Tour Created.", tour: newTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tour." });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await TourModel.findByPk(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found." });
    }

    const items = await TourItemModel.findAll({
      where: { tourId: tour.id },
    });

    const concerts = [];
    const afterParties = [];
    const merchandiseStalls = [];

    for (const item of items) {
      if (item.type === "concert") {
        const concert = await ConcertModel.findByPk(item.itemId);
        if (concert) concerts.push(concert);
      } else if (item.type === "afterParty") {
        const afterParty = await AfterPartiesModel.findByPk(item.itemId);
        if (afterParty) afterParties.push(afterParty);
      } else if (item.type === "merchandiseStall") {
        const merchandiseStall = await MerchandiseStallsModel.findByPk(
          item.itemId
        );
        if (merchandiseStall) merchandiseStalls.push(merchandiseStall);
      }
    }

    res.status(200).json({
      tour,
      concerts,
      afterParties,
      merchandiseStalls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve tour." });
  }
};

module.exports = { createTour, getTour };
