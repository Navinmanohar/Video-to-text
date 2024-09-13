import React, { useState } from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import './App.css'
import "./components/test.css"
import Footer from './components/Footer.jsx';

const App = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDownloadUrl(`http://localhost:5000/download/${response.data.downloadUrl}`);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };


  return (
    <div>
      <div><Nav/></div>
      <div style={{height:"70vh"}} className='main'>
      <div class="wrapper">
  <input type="file" accept='video/*'  onChange={handleFileChange}  id="file" />
  <label for="file" >choose a file</label>

  <input type="button" onClick={handleUpload} id="btn" />
  <label for="btn" class="btn-1">upload file</label>
  </div>
      {downloadUrl&& (
        <a href={downloadUrl} download>
          <button>Download Transcription</button>
        </a>
      )}
    </div>
    
    <div><Footer/></div>
    </div>
  );
};

export default App;
