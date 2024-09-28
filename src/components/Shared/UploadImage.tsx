'use client';

import { UploadButton } from '@/lib/uploadthing';
import { Label } from '../ui/label';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setImgUrl: Dispatch<SetStateAction<string>>;
};

const UploadImage = ({ setImgUrl }: Props) => {
  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="image-upload">Upload Image</Label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            setImgUrl(res?.[0].url);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};

export default UploadImage;
