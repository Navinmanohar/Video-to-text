const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
async function  extractAudio(videoPath, audioPath) {
  console.log("Extraction start....")
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(audioPath)
      .on('end', () => {
        console.log('Audio extraction complete....');
        resolve(audioPath);
      })
      .on('error', (err) => {
        console.error('Error extracting audio:', err);
        reject(err);
      })
      .run();
  });
}
