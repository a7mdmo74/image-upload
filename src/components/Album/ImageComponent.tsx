'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

type Props = {
  image: {
    id: string;
    title: string;
    imgUrl: string;
    userId: string;
  };
};

const ImageComponent = ({ image }: Props) => {
  const { id } = image;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/album/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      window.location.reload();
    }
  }, [isDeleted]);

  return (
    <div
      key={image.id}
      className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Image
        className="rounded-t-lg h-72"
        src={image.imgUrl}
        width={500}
        height={200}
        alt={image.title}
      />
      <div className="p-5 flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {image.title}
        </h5>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default ImageComponent;
