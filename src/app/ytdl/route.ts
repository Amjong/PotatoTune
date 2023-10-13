import { type NextRequest } from 'next/server';
import ytdl from 'ytdl-core';
import fs from 'fs';

export async function GET(request: NextRequest) {
  //   /* TODO : Extract getVideoFileFromYoutubeUrl function */
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const videoId = ytdl.getURLVideoID(url);
  let outputFilePath: string = '';

  //   const ytdlInfo = await ytdl.getInfo(videoId);
  //   const format = ytdl.chooseFormat(ytdlInfo.formats, {
  //     quality: 'highestaudio',
  //   });
  //   const ytdlReadableStream = ytdl.downloadFromInfo(ytdlInfo, {
  //     format: format,
  //   });

  ytdl
    .getInfo(videoId)
    .then((info: any) => {
      // Select the video format and quality
      const format = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
      });
      // Create a write stream to save the video file
      outputFilePath = `${info.videoDetails.title}.mp3`;
      if (!fs.existsSync(outputFilePath)) {
        console.log('not exist!!!!!!');
        const outputStream = fs.createWriteStream(outputFilePath);
        // Download the video file
        ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);
        // When the download is complete, show a message
        outputStream.on('finish', () => {
          console.log(`Finished downloading: ${outputFilePath}`);
          /* TODO : Extract getLyricInfoFromAudioFile Function */
          getLyricInfoFromAudioFile(outputFilePath);
        });
      } else {
        console.log('already exist!!');
        getLyricInfoFromAudioFile(outputFilePath);
      }
    })
    .catch((err: any) => {
      console.error(err);
    });

  return new Response();
}

async function getLyricInfoFromAudioFile(filePath: string) {
  const auddUrl = 'https://api.audd.io/';

  const data: any = {
    api_token: '1b63ce97b7425d865d7ff7074d382174',
    file: fs.createReadStream(filePath),
  };

  const requestInit: any = {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: data,
  };

  fetch(auddUrl, requestInit)
    .then((res) => res.json())
    .then((value) => {
      console.log(value);
    });
}
