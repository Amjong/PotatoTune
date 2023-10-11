import { type NextRequest } from 'next/server';
import ytdl from 'ytdl-core';
import fs from 'fs';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  ytdl(url).pipe(fs.createWriteStream(`video.mp3`));
  return new Response();
}
