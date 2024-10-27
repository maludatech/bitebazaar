import nodemailer from "nodemailer";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

export const POST = async(req: Request, { params }: {params: {id: string}}) => {
    const userId = params.id;
    const {form} = await req.json();
    const {subject, message} = form;
    
    try {
        await connectToDb();

        // Fetch user details from the database
        const user = await User.findById(userId);

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

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

        // Email to the admin
        const adminMailOptions = {
            from: user.email,
            to: 'bitebazaarltd@gmail.com',
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                    <div style="text-align: center;">
                        <img src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1729522105/burger-solid_oa1sc9.png" alt="BiteBazaar Logo" style="width: 80px; height: 80px; margin-bottom: 20px;" />
                    </div>
                        <p style="color: #333; font-size: 18px; font-weight: bold;">Hello Admin,</p>
                        <p style="color: #555; font-size: 16px; font-weight: bold;">${subject}</p>
                        <p>You got a new message from ${user.fullName}:</p>
                        <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
                            This user by full name: ${user.fullName} sent the message below:
                            <br/>
                            ${message}
                            <br/>
                            <br/>
                            A quick reply to this message via the user's email: ${user.email} will be much appreciated.
                        </p>
                    <p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="color: #555; font-size: 14px; text-align: center;">
                        Thank you for choosing <span style="color: #16423c; font-weight: bold;">BiteBazaar</span>.<br>
                        <strong>Bon Appétit!</strong><br>
                        BiteBazaar Team
                    </p>
                </div>
            `
        };

        await transporter.sendMail(adminMailOptions);

        // Return success message
        return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });

    } catch (error) {
        console.error("Error sending email:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new Response(JSON.stringify({ message: `Error sending email: ${errorMessage}` }), { status: 500 });
    }
};
