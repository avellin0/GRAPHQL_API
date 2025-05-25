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
    const user = await middleware.Authenticate(email, token)

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

export default { Query, Usuario };
