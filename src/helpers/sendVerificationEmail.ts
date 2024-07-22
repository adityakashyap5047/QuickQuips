import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'adityakumar20050510@gmail.com',
            subject: 'QuickQuips Verification Code',
            react: VerificationEmail({username, otp: verifyCode, email}),
        });
        return {success: true, message: "Verification email send successfully"};
    } catch (emailError) {
        console.error("Error sending verification email: ", emailError);
        return {success: false, message: "Failed to send verification email"};
    }
}