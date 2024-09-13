const express = require('express');
const multer = require('multer');
const cors=require("cors")
const { createClient } = require('@deepgram/sdk');

const path = require('path');
const fs = require('fs');
// const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
 // Audio extraction logic
const { transcribeUrl } = require('./Audio/transcribeAudio'); // Transcription logic

const upload = multer({ dest: 'uploads/' });


const app = express();

app.use(cors())
app.get("/",(res,req)=>{
    res.send("hello world")
})
app.post('/upload', upload.single('video'), async (req, res) => {

  try {
    const videoPath = req.file.path;
    const audioPath = path.join('uploads', `${Date.now()}.wav`);

    // Extract audio from the video
    async function  extractAudio(videoPath, audioPath) {
      return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .output(audioPath)
          .on('end', () => {
            console.log('Audio extraction complete');
            resolve(audioPath);
          })
          .on('error', (err) => {
            console.error('Error extracting audio:', err);
            reject(err);
          })
          .run();
      });
    }
    await extractAudio(videoPath, audioPath);
    const transcribeUrl = async (audioFilePath) => {
      const deepgramApiKey = 'b6f10f39b69a33e0d898e6093e3bfa7af2f7da72'; // Your Deepgram API key
    
      console.log('Filepath audio:', audioFilePath);
    
      // Initialize the Deepgram SDK
      const deepgram = createClient(deepgramApiKey);
    
      try {
        // Transcribe the local audio file
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
          fs.readFileSync(audioFilePath),
          {
            smart_format: true,
            model: 'nova-2',
            language: 'en-US',
          }
        );
    
        if (error) throw error;
     console.log("this is result",result)
        // Extract the transcript text from the response
        const transcript = result.results.channels[0].alternatives[0].transcript;
      console.log("this is transcript",transcript)
       
     return transcript
       
      } catch (err) {
        console.error('Error during transcription:', err);
      }
    };
     
      
    const transcription = await transcribeUrl(audioPath);
  console.log("Transcript",transcription)
    // Write the transcription to a .txt file
    const transcriptFilePath = path.join('uploads', `${Date.now()}-transcription.txt`);
    fs.writeFileSync(transcriptFilePath, transcription);

    // Return the path to the transcription file for download
    res.json({ downloadUrl: `${path.basename(transcriptFilePath)}` });

    // Optionally, delete the audio and video files after processing
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the transcription file for download
app.get('/download/:filename', (req, res) => {
  console.log("download url",req.params.filename)
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (path.extname(filePath) !== '.txt') {
    return res.status(400).json({ error: 'Invalid file type requested' });
  }
  res.setHeader('Content-Type', 'text/plain');
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).json({ error: 'File not found or cannot be downloaded' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
