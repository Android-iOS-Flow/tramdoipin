import mongoose from 'mongoose';
import type { ConnectOptions } from 'mongoose';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, clientOptions as ConnectOptions);
      console.log("✅ Kết nối MongoDB thành công!");
    } catch (error) {
      console.error("❌ Kết nối MongoDB thất bại:", (error as Error).message);
      process.exit(1); // Dừng ứng dụng nếu không kết nối được DB
    }
  };
  
export default connectDB;