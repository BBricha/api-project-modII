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
    // const [displayChat, setDisplayChat] = useState('')
    const [logInput, setLogInput] = useState([])

    const [displayText, setDisplayText] = useState('');

    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey);
    const fetchData = async (userInput, apiK) => {    
        console.log(apiK)
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: apiK,
        });
        console.log("making query");
        delete configuration.baseOptions.headers['User-Agent'];
        const openai = new OpenAIApi(configuration);
        try { let response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 50,
                messages: [{role: "user", content: `${userInput}`}],
                        
            });
    
            
        const newChat = [...chat];
        newChat.push(response.data.choices[0].message.content);
        setChat(newChat);

        const newLogInput = [...logInput];
        newLogInput.push(userInput);
        setLogInput(newLogInput);

        
        setInput({
            user_input: ""
        })
        } catch(error){
            console.log(error);
        }

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
        
        fetchData(input.user_input, apiKey)
        
    }
    
    let delay = 50;
        
    useEffect(() => {
        const lastMessage = chat[chat.length - 1];
        if (lastMessage) {
            let timer = setTimeout(() => {
                const nextCharIndex = displayText.length + 1;
                setDisplayText(lastMessage.substring(0, nextCharIndex));
            }, delay);
    
            return () => {
                clearTimeout(timer);
            };
        }
    }, [displayText, chat]);
    

    // console.log(interval);
    let chatJSX = chat.map((message, index) => {
        return (<div>
            <div className='user_img_text'>
                <img className='user_img' src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg' />
                <p> {logInput[index]}</p>
            </div>
            <div className='assistance_img_text'>
                <img className='user_img' src='https://static.vecteezy.com/system/resources/previews/011/894/733/original/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg' />
                <p>{displayText}</p>
            </div>
        </div>)
    })

    // const dots = ()=> {if (chat.length < logInput.length){
    //     return <LoadingDots />
    // }};

    
    // const text = `in particular, is fine-tuned to excel in generating responses to conversational prompts. It can be used for various applications such as chatbots, virtual assistants, customer support systems, and more. The model is capable of understanding context, generating coherent and contextually relevant responses, and engaging in back-and-forth conversations. So let's ask it to do tasks for us.`
    
    // useEffect(() => {
    //     let timer;
    //       const nextCharIndex = displayText.length + 1;
      
    //       timer = setTimeout(() => {
    //         setDisplayText(prevDisplayText => text.substring(0, nextCharIndex));
    //       }, delay);
        
      
    //     return () => {
    //       clearTimeout(timer);
    //     };
    //   }, [displayText]);
    
    
    // let textChat = <h4><h2>CHATGPT</h2>{displayText}</h4>



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
                        value={input.user_input}
                        name="user_input"
                       
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                fetchData(input.user_input, apiKey);
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
