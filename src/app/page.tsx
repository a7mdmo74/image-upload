'use client';
import { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import UploadImage from '@/components/Shared/UploadImage';
import Image from 'next/image';
import Spinner from '@/components/Shared/Spinner';
import { toast } from 'react-toastify';

export default function Home() {
  const { getUser } = useKindeBrowserClient();
  const userId = getUser()?.id;
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!imgUrl || !title) return;

    try {
      const response = await fetch('/api/album/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, imgUrl }),
      });

      if (response.ok) {
        // Handle successful upload
        setImgUrl('');
        setTitle('');
        setIsLoading(false);
        toast.success('Image Uploaded', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // Reset form or redirect user
      } else {
        // Handle error
        console.error('Failed to upload image');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-6">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Album Image Upload</CardTitle>
          <CardDescription>Upload an image for your album</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">title</Label>
              <Input
                id="text"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <UploadImage setImgUrl={setImgUrl} />
            <div className="space-y-2">
              <Label htmlFor="image-preview">Preview Image</Label>
              {imgUrl && (
                <Image src={imgUrl} width={500} height={500} alt="preview" />
              )}
            </div>
            <Button
              type="submit"
              className={isLoading ? 'opacity-50 w-full' : 'w-full'}
            >
              {isLoading ? <Spinner /> : 'Upload '}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
