import prismaClient from "../config/prismaClient";

export const existingUser = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
  return user;
};

export const saveUser = async (email: string, name: string) => {
  const newUser = await prismaClient.user.create({
    data: {
      email,
      name,
    },
  });
  return newUser;
};
