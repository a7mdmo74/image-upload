import prisma from './prisma';

export const getImages = async (id: string) => {
  const images = await prisma.image.findMany({
    where: {
      userId: id,
    },
  });

  return images;
};

export const uploadImage = async (
  userId: string,
  title: string,
  imgUrl: string
) => {
  try {
    const image = await prisma.image.create({
      data: {
        userId,
        title,
        imgUrl,
      },
    });

    return image;
  } catch (error) {
    console.log(error);
  }
};

export const removeImage = async (id: string) => {
  try {
    await prisma.image.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
