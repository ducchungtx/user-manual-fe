import { NextRequest, NextResponse } from 'next/server';
import { getFileById } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    const fileData = await getFileById(fileId);

    if (!fileData) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ fileUrl: fileData.url });
  } catch (error) {
    console.error('Error fetching file data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve file information' },
      { status: 500 }
    );
  }
}
