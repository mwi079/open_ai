import axios from 'axios'
import React,{ useState } from 'react';
import {TextField,Button} from "@mui/material/";
import LoadingSpin from "react-loading-spin";

function App() {

  const [text, setText]=useState('')
  const [image,setImage]=useState('')
  const [loading,setLoading]=useState(false)

  async function handleSubmit(event){
    event.preventDefault()
    setLoading(true)
    const apiKey=process.env.apiKey
    const headers={'Authorization':`Bearer ${apiKey}`,'Content-Type':'application/json'}

    await axios.post('https://api.openai.com/v1/images/generations',{'prompt':text},{headers})
      .then(({data})=>{
        setImage(data.data[0].url)
        setLoading(false)
      }) 
  }//

  return (
    <div>
    <center>
      <TextField onChange={(event) => setText(event.target.value)} fullWidth   InputProps={{
        sx: {
            "& input": {
                textAlign: "center"
            }
        }
    }}/>
      <Button onClick={handleSubmit}>Submit</Button>
    </center>
    <center>
    {loading? <LoadingSpin/>:<img src={image} alt="AI magic" width="500" sx={{input: {textAlign: "center"}}}/>}
    </center>
    </div>
  );
}

export default App;
