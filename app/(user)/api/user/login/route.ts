import { connectToDb } from "@/utils/database";

export const POST = async(req:Request, res: Response) => {
    try{
        await connectToDb();
    }catch(error){

    }
}