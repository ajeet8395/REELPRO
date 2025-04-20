import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";

// Define the POST method for the route to register a user 
export async function POST(request: NextRequest) {
  // Try to register a user and return an error if it fails 
    try {
        // Get the email and password from the request body 
    const { email, password } = await request.json();

    // If the email or password is missing, return an error
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide an email and password" },
        { status: 400 }
      );
    }

    // Connect to the database 
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    // If the user already exists, return an error
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    await User.create({ email, password });

    // If the user is registered successfully, return a success response 
    return NextResponse.json(
      { message: "User resgistered successfully" },
      { status: 201 }
    );
  } catch (error) {
    // If an error occurs, return an error response
    return NextResponse.json(
      { error: "Failed to register User" },
      { status: 500 }
    );
  }
}
