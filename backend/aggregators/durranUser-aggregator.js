
import axios from 'axios'
const { COLLECTION } = require("radiks-server/app/lib/constants");
const sortBy = require("lodash/sortBy");

export const aggregateDurranUser = async (radiksData, query) => {
  const match = {
    $match: {
      radiksType: "DurranUser"
    }
  };

  if (query.lt) {
    match.$match.createdAt = {
      $lt: parseInt(query.lt, 10)
    };
  }

  if (query.gte) {
    match.$match.createdAt = {
      $gte: query.gte
    };
  }

  if (query.durranUser) {
    match.$match.username = query.durranUser;
  }

  const sort = {
    $sort: { createdAt: -1 }
  };

  const limit = {
    $limit: query.limit || 10
  };

  const entryLookup = {
    $lookup: {
      from: COLLECTION,
      localField: "username",
      foreignField: "createdBy",
      as: "entries",
    },
  };

  const pipeline = [match, entryLookup, sort];

  const user = await radiksData.aggregate(pipeline).toArray();

  return user;
};


module.exports = {
  aggregateDurranUser,
};
