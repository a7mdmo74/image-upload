import ImageComponent from '@/components/Album/ImageComponent';
import { getImages } from '@/lib/actions';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react';

const AlbumPage = async () => {
  const { getUser } = getKindeServerSession();
  const { id } = await getUser();
  const album = await getImages(id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {album.length === 0 ? (
        <div>No images found</div>
      ) : (
        album.map((image) => <ImageComponent key={image.id} image={image} />)
      )}
    </div>
  );
};

export default AlbumPage;
