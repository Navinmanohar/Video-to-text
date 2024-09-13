const fs = require('fs');
const { createClient } = require('@deepgram/sdk');

const transcribeUrl = async (audioFilePath) => {
  console.log("Transcript start...")
  const deepgramApiKey = 'b26f9ef1c68eef9546e254bf4fad42e9f8e803b1'; // Your Deepgram API key

  console.log('Filepath audio:', audioFilePath);


  const deepgram = createClient(deepgramApiKey);

  try {

    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
      fs.readFileSync(audioFilePath),
      {
        smart_format: true,
        model: 'nova-2',
        language: 'en-US',
      }
    );

    if (error) throw error;

  const transcript = result.results.channels[0].alternatives[0].transcript;
  console.log('Transcription and sentences have been written to files...');
 return transcript

  } catch (err) {
    console.error('Error during transcription:', err);
  }
};
 
