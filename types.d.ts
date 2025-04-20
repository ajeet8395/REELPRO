import { Connection } from "mongoose" // Import the Connection type from mongoose

// Declare a global variable named mongoose
declare global {
    var mongoose: {
        conn: Connection | null
        promise: Promise<Connection> | null
    }
}

export {};