import { uploadImage } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, title, imgUrl } = await request.json();

    if (!imgUrl) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'Missing userId or title' },
        { status: 400 }
      );
    }

    const result = await uploadImage(userId, title, imgUrl);

    return NextResponse.json({ success: true, imgUrl: result });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
