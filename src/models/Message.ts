import mongoose from "../db/conn";

const { Schema } = mongoose;
const Message = mongoose.model(
  "Message",
  new Schema(
    {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

export default Message;
