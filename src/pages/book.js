import { useState } from "react";
import axios from "axios";
import styles from '../styles/Book.module.css'
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [arr, setArr] = useState([])
  const [loading, setLoading] = useState(false)
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const handleFileUpload = async (str) => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData);
    if(str === 'patterns'){
      setLoading(true)
      try {
        const response = await axios.post('http://localhost:3000/sentences',{
          body: {
              'file': formData
          }
        }
        )
        setArr(response.data);
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
    if(str === 'freq') {
      console.log('at least im trying')
      try {
        const response = await axios.post('http://localhost:3000/test',{
          body: {
            'file': formData
          }
        })
        console.log(response.data);
        setLoading(false)
        setArr(["You did something horribly wrong"])
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => handleFileUpload('freq')}>Frequent Words</button>
      <button onClick={() => handleFileUpload('patterns')}>Patterns</button>
      {arr ? <p>{arr}</p> : null}
      {loading ? <p>Loading...</p>: <p>Ion know</p>}
    </div>
  );
}

export default FileUpload;
