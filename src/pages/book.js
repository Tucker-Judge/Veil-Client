import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3000/upload',{
        body: {
            'file': formData
        }
  }
      )
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
