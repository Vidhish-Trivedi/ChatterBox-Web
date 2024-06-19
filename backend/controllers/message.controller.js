import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    // res.send("Send Message Route, sender id: " + req.params.id);
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