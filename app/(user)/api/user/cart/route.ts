import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import Cart from "@/models/cart";

export const POST = async (req: Request, res: Response) => {
    try {
        // Parse the request body to get the cart data
        const { cart, userId } = await req.json(); // Assuming userId is passed along with the cart data

        // Connect to the database
        await connectToDb();

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Check if the user already has a cart
        let userCart = await Cart.findOne({ buyer: userId });

        if (userCart) {
            // Update existing cart
            userCart.items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            }));
            userCart.totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            userCart.updatedAt = new Date();
        } else {
            // Create a new cart
            userCart = new Cart({
                buyer: userId,
                items: cart.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
                totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            });
        }

        // Save the cart
        await userCart.save();

        return new Response(JSON.stringify({ success: true, cart: userCart }), { status: 200 });
    } catch (error) {
        console.error("Error saving cart:", error);
        return new Response("Failed to save cart", { status: 500 });
    }
};
