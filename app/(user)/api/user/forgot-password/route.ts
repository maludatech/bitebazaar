import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

const generateUniqueResetToken = async () => {
    const generateToken = () => crypto.randomBytes(3).toString("hex").slice(0, 6);
  
    let resetToken;
    let existingUser;
  
    do {
      resetToken = generateToken();
      existingUser = await User.findOne({ resetToken });
    } while (existingUser);
  
    return resetToken;
};
  
  export const POST = async (req: Request, res: Response) => {
    try {
      const { email } = await req.json();
  
      await connectToDb();
      const user = await User.findOne({ email });
  
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
      }
  
      // Generate unique reset token
      const resetToken = await generateUniqueResetToken();
      const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
  
      // Save token and expiry to user
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
  
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
  
      const mailOptions = {
        from: 'BiteBazaar Ltd',
        to: user.email,
        subject: '🔒 Password Reset - BiteBazaar',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1729522105/burger-solid_oa1sc9.png" alt="BiteBazaar Logo" style="width: 80px; height: 80px; margin-bottom: 20px;" />
                </div>
                <p style="color: #333; font-size: 18px; font-weight: bold;">Hello ${user.fullName},</p>
                <p style="color: #555; font-size: 16px;">You recently requested to reset your password for your CryptFX account.</p>
                <p style="color: #333; font-weight: bold; font-size: 22px; background-color: #f8f8f8; padding: 10px 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                    ${resetToken}
                </p>
                <p style="color: #555; font-size: 16px;">Please use the above code to reset your password. This code will expire in 30 minutes.</p>
                <p style="color: #555; font-size: 16px;">If you did not request this, please ignore this email or <a href="https://bitebazaer.vercel.app/contact" style="color: #16423C; text-decoration: none;">contact our support team</a> immediately.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #555; font-size: 14px; text-align: center;">
                    Thank you for choosing <span style="color: #16423c; font-weight: bold;">BiteBazaar</span>.<br>
                    <strong>Bon Appétit!</strong><br>
                    BiteBazaar Team
                </p>
            </div>
        `,
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
  
      return new Response(JSON.stringify({ message: "Password reset email sent" }), { status: 200 });
    } catch (error) {
      console.error("Error getting email", error);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
  };
  