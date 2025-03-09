const moongoose = require("mongoose");

const connectionReqschema = new moongoose.Schema(
  {
    fromUserId: {
      type: moongoose.Schema.Types.ObjectId,
      required: true,
    },
    ToUserId: {
      type: moongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "intrested", "accepted", "rejected"],
        message: "`{VALUE}` is not a valid status",
      },
    },
  },
  { timestamps: true }
);

//schema pre save method

const connectionReqmodel = moongoose.model(
  "connectionReqmodel",
  connectionReqschema
);

module.exports = connectionReqmodel;
