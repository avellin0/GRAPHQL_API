import jwt from "jsonwebtoken";
import { prisma } from "../../prisma";

export class Middleware {
  async Authenticate(email: string, RefreshToken?: String, token?: string) {
    try {
      console.log(
        "this is the refresh:",
        RefreshToken,
        "this is the token:",
        token
      );

      if (token) {
        await this.VerifyToken(token);
      }

        await this.VerifyRefresh(RefreshToken as string);

      const user = await prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          refresh_token: true,
        },
      });

      console.log("esse é o user:", user);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async VerifyToken(token: string) {
    try {
      const isValid = jwt.verify(token as string, "MY_SECRET_KEY");
      console.log("Consegui!");

      return isValid ?? false;
    } catch (error) {
      throw new Error(error);
    }
  }

  async VerifyRefresh(RefreshToken: string) {
    try {
      const isValid = jwt.verify(RefreshToken as string, "MY_REFRESH_KEY");
      console.log("this is valid:", isValid);

      return isValid ?? false;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const teste = new Middleware();
