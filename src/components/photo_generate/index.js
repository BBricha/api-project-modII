import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();
 
const PhotoGenerate = () => {
    const [img, setImg] = useState([]);
    const [input, setInput] = useState({
        user_input: ""
    });

   
    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async (userInput, apiKey) => {      
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: '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',
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: `${userInput}`,
            n: 1,
            size: "256x256",
          });
        const newimg = [...img];
        newimg.push(response.data.data[0].url)
        console.log(response.data.data[0].url)
        setImg(newimg);
    }
  
    // console.log(img)
    // console.log(input)

    // useEffect( () => {
    //     fetchData()
        
    // },[])
    
    const handleChange = (event) => {

        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        
        fetchData(input.user_input)
        
        setInput({ user_input: "" });
    };

    // console.log(input);
    return (
        <div>
            
               
            <div className='response_input_container'>
               <img src='https://bulma.io/images/placeholders/256x256.png' />
               <img src='https://bulma.io/images/placeholders/256x256.png' />
               
               
               
                {img.map((message) => {
                                    return <img src={message}/>

                                })}
            </div>
            <form onSubmit={handleSubmit}>
            What do you want the image to look like?
                <input
                type="text"
                placeholder="Type here..."
                name="user_input"
                value={input.user_input}
                onChange={handleChange}
                />
                <input type="submit" value="Img" />
            </form>

            


        </div>
    )
}

export default PhotoGenerate;