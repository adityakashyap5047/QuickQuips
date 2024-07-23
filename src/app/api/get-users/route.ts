import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request){
    await dbConnect();

    try {
        const users = await UserModel.find({}).select('username');
        if(!users){
            return Response.json(
                {
                    success: false,
                    message: "Failed to get users"
                },
                {
                    status: 401,
                    headers: {
                        'Cache-Control': 'no-store',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
        return Response.json(
            {
                success: true,
                users: users.map(user => user.username)
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        console.error("An error occurred while getting users", error)
        return Response.json(
            {
                success: false,
                message: "Failed to get users"
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'no-store',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}