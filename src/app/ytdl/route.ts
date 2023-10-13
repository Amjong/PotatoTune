import { type NextRequest } from 'next/server';
import ytdl from 'ytdl-core';
import fs from 'fs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const videoId = ytdl.getURLVideoID(url);

  ytdl
    .getInfo(videoId)
    .then((info: any) => {
      // Select the video format and quality
      const format = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
      });
      // Create a write stream to save the video file
      const outputFilePath = `${info.videoDetails.title}.mp3`;
      const outputStream = fs.createWriteStream(outputFilePath);
      // Download the video file
      ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
      // When the download is complete, show a message
      outputStream.on('finish', () => {
        console.log(`Finished downloading: ${outputFilePath}`);
      });
    })
    .catch((err: any) => {
      console.error(err);
    });
  return new Response();
}
