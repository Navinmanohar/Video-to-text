import React from 'react'
import './test.css'


function Test() {
  return <div>
    <div class="wrapper">
  <input type="file"  onChange={handleFileChange}  id="file" />
  <label for="file" >choose a file</label>

  <input type="file" onClick={handleUpload} id="file" />
  <label for="btn" class="btn-1">upload file</label>
  </div>
  </div>


  
}

export default Test