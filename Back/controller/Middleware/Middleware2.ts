import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/index"
import { CreateRefresh } from "../RefreshToken/CreateRefresh";

export class Middleware {
  async Authenticate(email: string, token?: string, RefreshToken?: string) {
    try {
      console.log(
        "this is the refresh:",
        RefreshToken,
        "this is the token:",
        token
      );

      
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });


      if (token && token.length > 0) {
        const isValid = await this.VerifyToken(token);

        if (isValid) {
          console.log("Token Válido");
          return user;
        } else {
          console.log("Token inválido, tentando RefreshToken...");

          const confirmUser = await prisma.user.findFirst({
            where: {
              email,
            },
            select: {
              refresh_token: true,
            },
          });

        if (confirmUser?.refresh_token ) {
            RefreshToken = confirmUser.refresh_token.token;
          }

          const HasRefresh = await this.VerifyRefresh(RefreshToken as string);

          if (HasRefresh) {
            console.log("Bem vindo novamente");
            
            const newToken = await this.CreateToken(RefreshToken);
            token = newToken;
            return user;

          } else {
            RefreshToken = await CreateRefresh(email);
            return user;
          }
        }
      }
    } catch (error) {
      console.error("Erro ao verificar refresh token", error);
      return false;
    }
  }

  async VerifyToken(token: string) {
    try {
      const isValid = jwt.verify(token as string, "MY_SECRET_KEY");
      console.log("Consegui!");

      return true;
    } catch (error) {
      return false;
    }
  }

  async VerifyRefresh(RefreshToken: string) {
    try {
      const RefreshTokenConfirm = jwt.verify(RefreshToken as string, "MY_REFRESH_KEY");
      console.log("this is valid:", RefreshTokenConfirm);

      return true;
    } catch (error) {
      console.error("Erro ao verificar refresh token", error);
      return false;
    }
  }

  async CreateToken(RefreshToken: any) {
    const WhoIsYou = await prisma.user.findFirst({
      where: {
        refresh_token: {
          token: RefreshToken,
        },
      },
    });

    console.log("Quem é você:", WhoIsYou);

    const newToken = jwt.sign(
      {
        user: WhoIsYou,
      },
      "MY_SECRET_KEY",
      {
        algorithm: "HS256",
        expiresIn: "15min",
      }
    );

    return newToken;
  }
}
