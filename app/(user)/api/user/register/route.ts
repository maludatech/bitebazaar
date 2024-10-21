import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Function to generate unique reset token
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
    const form = await req.json();

    if (!form || !form.email) {
      return new Response(JSON.stringify({ message: "Invalid request data" }), { status: 400 });
    }

    const { email, password, fullName, phoneNumber, billingAddress} = form;

    await connectToDb();

      // Check if the email already exists
    const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
      return new Response(JSON.stringify({ message: "User with this email already exists, please sign in" }), { status: 400 });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate unique reset token
      const resetToken = await generateUniqueResetToken();
      const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

      // Create new user
      const newUser = new User({
        email,
        password: hashedPassword,
        fullName,
        phoneNumber,
        billingAddress,
        resetToken,
        resetTokenExpiry,
      });

      await newUser.save();

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
        to: newUser.email,
        subject: '🎉 Welcome to BiteBazaar',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
                <div style="text-align: center;">
                    <img src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1729522105/burger-solid_oa1sc9.png" alt="BiteBazaar Logo" style="width: 80px; height: 80px; margin-bottom: 20px;" />
                </div>
                 <h2 style="color: #333; text-align: center;">Welcome to BiteBazaar, ${newUser.fullName}!</h2>
                <p style="color: #555; font-size: 16px;">
                    We're excited to have you join the BiteBazaar family! Your account has been successfully created, and now you're ready to dive into the delicious world of shawarmas, burgers, and more.
                </p>
                <p style="color: #555; font-size: 16px; padding: 12px; border-left: 4px solid #16423c; font-style: italic;">
                    Whether you're craving our famous shawarmas or juicy burgers, we promise to delight your taste buds with every bite. Our menu is packed with mouthwatering options that will keep you coming back for more!
                </p>
                <p style="color: #555; font-size: 16px;">
                    Get started by browsing our <a href="https://www.bitebazaar.com/menu" style="color: #16423c; text-decoration: none;">menu</a> and placing your first order. We can’t wait to serve you!
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://www.bitebazaar.com/sign-in" style="display: inline-block; padding: 12px 24px; background-color: #16423c; color: #FFE5CF; text-decoration: none; border-radius: 5px; font-weight: bold;">Log in to Your Account</a>
                </div>
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

      // Return success response
      return new Response(JSON.stringify({ message: "User created successfully", email: newUser.email, username: newUser.username }), { status: 201 });
    } catch (error: any) {
      console.error("Error creating user or sending email:", error.message);
      return new Response(JSON.stringify({ error: "Failed to create user or send email" }), { status: 500 });
    }
  } catch (error: any) {
    console.error("Error during signup:", error.message || "Internal Server Error");
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
