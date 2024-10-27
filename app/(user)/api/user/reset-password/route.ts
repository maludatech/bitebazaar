import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

export const POST = async (req: Request, res: Response) => {

    const { userId, newPassword } = await req.json();

    try {
        await connectToDb();

        // Fetch the user's current password hash from the database
        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Compare the new password with the current password
        const isMatch = await bcrypt.compare(newPassword, user.password);
        if (isMatch) {
            return new Response(JSON.stringify({ message: "Old password cannot be used" }), { status: 400 });
        }

        // Hash the new password and update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ _id: userId }, { password: hashedPassword, resetToken: null });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const passwordChangeMailOptions = {
            from: 'BiteBazaar Ltd',
            to: user.email,
            subject: '🔐 Password Change Notification',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="text-align: center;">
                        <img src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1729522105/burger-solid_oa1sc9.png" alt="BiteBazaar Logo" style="width: 80px; height: 80px; margin-bottom: 20px;" />
                    </div>
                    <p style="color: #333; font-size: 18px; font-weight: bold;">Hello ${user.fullName},</p>
                    <p style="color: #555; font-size: 16px; font-weight: bold;">Password Change Notification</p>
                    <p style="color: #333; font-weight: bold; font-size: 22px; background-color: #f8f8f8; padding: 10px 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        Your password has changed.
                    </p>
                    <p style="color: #555; font-size: 16px;">If you initiated this change, disregard this email. If you did not initiate this change, contact support.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="color: #555; font-size: 14px; text-align: center;">
                        Thank you for choosing <span style="color: #16423c; font-weight: bold;">BiteBazaar</span>.<br>
                        <strong>Bon Appétit!</strong><br>
                        BiteBazaar Team
                    </p>
                </div>
            `
        };
        
        // Send email
        await transporter.sendMail(passwordChangeMailOptions);

        return new Response(JSON.stringify({ message: "Password updated successfully", email: user.email, username: user.username }), { status: 200 });
    } catch (error) {
        console.error("Error updating password: ", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
};
