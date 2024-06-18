import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken {
  // Define the properties of the decoded token based on your token's payload structure
  userId: string;
  // Add other properties as needed
}

interface AuthRequest extends Request {
  user?: DecodedToken;
}

export default async (request: AuthRequest, response: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the token from the authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing");
    }

    // Verify the token and retrieve the user details
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN") as DecodedToken;

    // Pass the user down to the endpoints here
    request.user = decodedToken;

    // Pass down functionality to the endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
