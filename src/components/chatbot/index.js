import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import "./index.css"
// import TextField from '@mui/material/TextField';

const Chatbot =  () => {

    const [chat, setChat] = useState([]);
    const [input, setInput] = useState({
        user_input: "Hello! How may I assist you"
    });
    const [logInput, setLogInput] = useState([])

    const fetchData = async (userInput) => {      
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: '',
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 3,
            messages: [{role: "user", content: `${userInput}`}],
                    
        });
        const newChat = [...chat];
        newChat.push(response.data.choices[0].message.content);
        setChat(newChat);

        const newLogInput = [...logInput];
        newLogInput.push(userInput);
        setLogInput(newLogInput);
    }
  
    console.log(chat)
    console.log(input)

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
       
    }
    console.log(input);
    return (
        <div className='chat_container'>
            <div className='response_input_container'>
            
                {chat.map((message, index) => {
                    return (<div>
                        <p>User: <br/> {logInput[index]}</p>
                        <p>Assitant: <br/>{message}</p>

                    </div>)
                })}
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