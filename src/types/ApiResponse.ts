import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptinMessage?: boolean;
    messages?: Array<Message>;
    users?: Array<string>;
}