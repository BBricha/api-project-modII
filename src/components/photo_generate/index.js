import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();
import "./index.css"
const PhotoGenerate = () => {
    const [img, setImg] = useState([]);
    const [input, setInput] = useState({
        user_input: ""
    });

    const [displayText, setDisplayText] = useState('');


    const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async (userInput, apik) => {
        console.log(process.env);
        console.log(apik)      
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: apik,
        });
        delete configuration.baseOptions.headers['User-Agent'];
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
        
        fetchData(input.user_input, apiKey)
        
        setInput({ user_input: "" });
    };



    let imgJsx = img.map((message) => {
        return <div>
            <img src={message}/>
            <a href={message} download target="_blank">
                <button>Download Image</button>
            </a>

        </div>        
    })





     useEffect(() => {
            let timer;
              const nextCharIndex = displayText.length + 1;
          
              timer = setTimeout(() => {
                setDisplayText(prevDisplayText => imgIATxt.substring(0, nextCharIndex));
              }, 25);
            
          
            return () => {
              clearTimeout(timer);
            };
          }, [displayText]);
        
        
        
    

    let imgIATxt = `is a cutting-edge technology that utilizes artificial intelligence algorithms to generate realistic and high-quality images. These algorithms are trained on massive datasets and learn to create new images based on patterns and features they observe in the training data.The image generator works by taking input in the form of text descriptions, keywords, or even rough sketches, and then translating that input into a visually appealing and coherent image. The AI model understands the context and intent of the input and generates a unique image that matches the description.`
    let textChat = <h4><h2>AI-powered image generator</h2> {displayText} </h4>
    // console.log(input);
    return (
        <div>
            
               
            <div className='response_input_container'>
               {/* <img src='https://bulma.io/images/placeholders/256x256.png' />
               <img src='https://bulma.io/images/placeholders/256x256.png' />
               
                */}
               
               {img.length > 0 ? imgJsx:textChat }
            </div>
            <form className='input_container_img' onSubmit={handleSubmit}>
 
                <input className='img_search_input'
                type="text"
                placeholder="Type here..."
                name="user_input"
                value={input.user_input}
                onChange={handleChange}
                />
                <input className='img_button' type="submit" value="Img" />
            </form>

            


        </div>
    )
}

export default PhotoGenerate;