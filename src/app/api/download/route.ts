import { API_BASE_URL } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the URL parameter
  const url = request.nextUrl.searchParams.get('url');
  const fileName = request.nextUrl.searchParams.get('name') || 'download';

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch the file from the external server
    const response = await fetch(`${API_BASE_URL}${url}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the file content as ArrayBuffer
    const fileContent = await response.arrayBuffer();

    // Get the content type from the original response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    // Create a new response with the file content
    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        // Cache the file for better performance
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error proxying download:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
