
//message

import Message from "../model/messageModel.js";

export const addMessage = async (req, res, next) => {
    try{
        const {from, to , message} = req.body;
        const data = await Message.create({
            message:{text:message},
            users : [from,to],
            sender:from,
        });
        if(data) return res.json({msg:"Message added sucessfully"});
        return res.json({msg:"message not sent"});
    }
    catch(ex){
        next(ex);
    }
    

    
}

export const getAllMessage  = async (req, res, next) => {
    try{
        const {from ,to } = req.body;
        //! messageModel == Message
        const messages = await Message.find({
            users:{
                $all:[from,to],
            },
        }) 
        .sort({updatedAt:1});
        const projectedMessages = messages.map((msg)=>{return {
            fromSelf: msg.sender.toString()=== from,
            message : msg.message.text,

        };
    });
    res.json(projectedMessages)
    }
    catch(ex){
        next(ex);
    }


};

// !this is done after the above code 
// !refrencin messages with msg

// export const getAllMessage  = async (req, res, next) => {
//     try {
//         const { from, to } = req.body;
//         const messages = await Message.find({
//             users: { $all: [from, to] },
//         }).sort({ updatedAt: 1 });

//         const projectedMessages = messages.map((message) => ({
//             fromSelf: message.sender.toString() === from,
//             message: message.message.text,
//         }));

//         res.json(projectedMessages);
//     } catch (ex) {
//         next(ex);
//     }
// };
