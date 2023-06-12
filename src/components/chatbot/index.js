import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import "./index.css"
import LoadingDots from '../form/Form';
// import TextField from '@mui/material/TextField';
// require('dotenv').config();

const Chatbot =  () => {

    const [chat, setChat] = useState([]);
    const [input, setInput] = useState({
        user_input: ""
    });
    const [logInput, setLogInput] = useState([])

    // const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async (userInput, apiKey) => {      
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: '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',
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 5,
            messages: [{role: "user", content: `${userInput}`}],
                    
        });
        const newChat = [...chat];
        newChat.push(response.data.choices[0].message.content);
        setChat(newChat);

        const newLogInput = [...logInput];
        newLogInput.push(userInput);
        setLogInput(newLogInput);
    }
  
    // console.log(chat)
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
        event.target.value = "" 
    }
    
    
    
    // console.log(interval);
    let chatJSX = chat.map((message, index) => {
        return (<div>
            <div className='user_img_text'>
                <img className='user_img' src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg' />
                <p> {logInput[index]}</p>
            </div>
            <div className='assistance_img_text'>
                <img className='user_img' src='https://static.vecteezy.com/system/resources/previews/011/894/733/original/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg' />
                <p>{message}</p>
            </div>
        </div>)
    })
    // const dots = ()=> {if (chat.length < logInput.length){
    //     return <LoadingDots />
    // }};
    let textChat = <h4><h2>CHATGPT</h2>in particular, is fine-tuned to excel in generating responses to conversational prompts. It can be used for various applications such as chatbots, virtual assistants, customer support systems, and more. The model is capable of understanding context, generating coherent and contextually relevant responses, and engaging in back-and-forth conversations. 
        <br /> So let's ask it to do tasks for us. </h4>
    return (
        <div className='chat_container'>
            <div className='response_input_container'>
            
                {chat.length > 0 ? chatJSX:textChat }
            </div>
            <div >
            
                <form onSubmit={handleSubmit} className="input-container">
                
                    <textarea 
                        className='custom-textarea'
                        type="text"
                        placeholder={input.user_input}
                        name="user_input"
                       
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                fetchData(input.user_input);
                                event.preventDefault()
                            }
                            else {event.target.style.height = '';
                                event.target.style.height = `${event.target.scrollHeight}px`;
                            }
                        }}
                    />
                        
                    <input type="submit" value="Submit" />
                    
                </form>
            </div>

        </div>
    )
}

export default Chatbot
