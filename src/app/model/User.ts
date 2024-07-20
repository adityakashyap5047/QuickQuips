import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    Content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    Content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

