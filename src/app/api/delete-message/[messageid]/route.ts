import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel, { User } from "@/model/User";

export async function DELETE(request: Request, {params}: {params: {messageid: string}}) {
    const messageId = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "You need to be logged in to delete a message"
            },
            {status: 401}
        )
    }
    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages: {_id: messageId}}}
        )
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted"
                },
                {status: 404}
            )
        }
        return Response.json(
            {
                success: true,
                message: "Message Deleted"
            },
            {status: 200}
        )
    } catch (error) {
        console.error("Error in the delete message route", error);
        return Response.json(
            {
                success: false,
                message: "Error while deleting message"
            },
            {status: 500}
        )
    }
}