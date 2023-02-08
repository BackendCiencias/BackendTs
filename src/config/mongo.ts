import 'dotenv/config'
import { connect  } from 'mongoose'

async function dbConnect(): Promise<void>{
    const MONGODB_URI = <string> process.env.MONGODB_URI
    await connect(MONGODB_URI)
}

export default dbConnect