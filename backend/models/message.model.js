import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // This is the name of the model that this field refers to
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });  // will give us the createdAt and updatedAt fields.

const Message = mongoose.model("Message", messageSchema);
export default Message;
