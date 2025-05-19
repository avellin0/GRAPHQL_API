import { prisma } from "../../prisma/index";
import { Middleware } from "../Middleware/Middleware2";

const Usuario = {
  permissao: async (args: any) => {
    const { permissao } = args;
    console.log("permissão:", permissao[0].id);

    console.log("isso que recebo das permissões:", args);

    return await prisma.permissoes.findUnique({
      where: {
        id: permissao[0].id,
      },
    });
  },
};

const Query = {
  usuario: async (_, { data }) => {
    const { email, token } = data;
    const middleware = new Middleware();
    const user = await middleware.Authenticate(email, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsInBob25lIjoiMjEgOSA3MDcwIDcwNzAiLCJpYXQiOjE3NDc0MzM4MzksImV4cCI6MTc1MDAyNTgzOX0.Gi9ku2GZ0BlvvABAEMaGRgwBBDPSp7Efin53xcnpQo8")

    return user
  },

  usuarios: async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  },
};

export { Query, Usuario };
