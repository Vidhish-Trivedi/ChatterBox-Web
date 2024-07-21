import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;    // receiverId is the id of the user to whom the message is to be sent, from the url params.
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            });
        }
        
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if(newMessage) {
            conversation.messages.push(newMessage._id);
            // await conversation.save();
            await Promise.all([conversation.save(), newMessage.save()]);  // Save both the conversation and the message in parallel.
            
            // Once the message is inserted into the database, emit the message event to the receiver's socket.
            const receiverSocketId = getReceiverSocketId(receiverId);
            if(receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage);
            }

            res.status(201).json({message: "Message sent successfully", newMessage: newMessage});
        }
        else {
            res.status(400).json({error: "An Error Occurred: Message not sent"});
        }
    }
    catch (error) {
        console.log("Error in sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: receiverId} = req.params;    // receiverId is the id of the user whose messages are to be fetched, from the url params.
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: {$all: [senderId, receiverId]}
        }).populate("messages"); // Populate the messages field of the conversation object, instead of simply returning the message ids.

        if(!conversation) {
            res.status(200).json([]);
        }
        else {
            const messages = conversation.messages;
            res.status(200).json(messages);
        }
    }
    catch (error) {
        console.log("Error in getMessages controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
