import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import "./index.css"

const Chatbot =  () => {
    // const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

    const [chat, setChat] = useState([]);
    
    const [input, setInput] = useState({
        user_input: ""
    });
    // const [displayChat, setDisplayChat] = useState('')
    const [logInput, setLogInput] = useState([])

    const [displayText, setDisplayText] = useState('');

    // const [updatedChat, setUpdatedChat] = useState([])

    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey);
    const fetchData = async (userInput, apiK) => {    
        // console.log(apiK)
        const configuration = new Configuration({
            organization: "org-HE64b63VFlL3RscL2hfzqOrm",
            apiKey: apiK,
        });
        // console.log("making query");
        delete configuration.baseOptions.headers['User-Agent'];
        const openai = new OpenAIApi(configuration);
        try { let response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                max_tokens: 200,
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
            const newChat = [...chat];
            newChat.push('Invalid API key: please verify your API');
            setChat(newChat);
        }

    }
  
    
    
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

    


    let checkMoreThanOne = true;
    let updatedChat = []
    if (chat.length > 1){
        checkMoreThanOne = true;
        updatedChat = [...chat]
        updatedChat.pop()
        
        console.log(updatedChat) ;
    }else if (chat.length === 1) {
        checkMoreThanOne = false;
    };
        
        const chatJSX = checkMoreThanOne ? updatedChat.map((message, index) => {

                    // console.log(message);
                return (<div>
                    <div className='user_img_text'>
                        <img className='user_img' src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg' />
                        <p> {logInput[index]}</p>
                    </div>
                    <div className='assistance_img_text'>
                        <img className='user_img' src='https://static.vecteezy.com/system/resources/previews/011/894/733/original/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg' />
                        <p>{message}</p>
                    </div>
                    <div className='user_img_text'>
                        <img className='user_img' src='https://previews.123rf.com/images/tuktukdesign/tuktukdesign1608/tuktukdesign160800037/61010821-user-icon-man-profile-businessman-avatar-person-glyph-vector-illustration.jpg' />
                        <p> {logInput[index + 1]}</p>
                    </div>
                    
                </div>)
            }) : chat.map((message, index) => {
            // console.log(checkMoreThanOne);
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


        let lastChatJSX ;
        if (checkMoreThanOne){
            lastChatJSX =  <div className='assistance_img_text'>
                <img className='user_img' src='https://static.vecteezy.com/system/resources/previews/011/894/733/original/artificial-intelligence-ai-robot-chat-bot-logo-template-free-vector.jpg' />
                <p>{displayText}</p>
            </div>
        }
   

   


    let textChat = <h4><h2>CHATGPT</h2>in particular, is fine-tuned to excel in generating responses to conversational prompts. It can be used for various applications such as chatbots, virtual assistants, customer support systems, and more. The model is capable of understanding context, generating coherent and contextually relevant responses, and engaging in back-and-forth conversations.
            <br/>-May occasionally generate incorrect information. <br/>-May occasionally produce harmful instructions or biased content. <br/>-Limited knowledge of world and events after 2021.
        <br /> So let's ask it to do tasks for us... </h4>


    return (
        <div className='chat_container'>
            <div className='response_input_container'>
            
                {chat.length > 0 ? chatJSX :textChat }
                {chat.length > 0 ? lastChatJSX : <></>}
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

export default Chatbot;
