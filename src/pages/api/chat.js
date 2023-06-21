import applyRateLimit from '@/components/middleware/applyRateLimit'
export default (req, res) => {
    // handle prevMessages after calling to openai
    applyRateLimit(req, res, async () => {
        console.log('congratulations you havent given up')
        if (req.method === "POST") {
            console.log("point me to the beepepppepepe")
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY
            });
            const openai = new OpenAIApi(configuration);
            const delay = new Promise((resolve, reject) => setTimeout(() => {
                resolve('timeout')
            },1000))
            const completion = new Promise(async (resolve, reject) => {
                try {
                    const result = await openai.createChatCompletion({ 
                        "model": "gpt-3.5-turbo",
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                        "messages": [
                            // role rotates based on input
                            // Corrective Conversation Translation Scenario
                            // {"role": "system", "content": `You are a learning partner for chatting in other languages. The previous words exchanged are the following stay with the conversation -- ${prevMessages}`},
                            // {"role": "user", "content": msg},
                            {"role": "system", "content": "You are testing my api"},
                            {"role": "user", "content": "This is a test please respond with a hello if you can see this"}
                        ]
                    });
                    resolve(result); // If the request was successful, resolve the promise with the result.
                } catch(err) {
                    reject(err); // If there was an error with the request, reject the promise with the error.
                }
            });
            
            Promise.race([completion, delay]).then((result) => {
                    if (result.timeout){
                        console.log(" fukcign finally ")
                        res.send(202).json({guess: "what mothafucka"})
                    }
                    if(result.status === 200){
                        console.log("meilleurr")
                        console.log(completion.data.choices[0].message.content) || completion.data.choices[0].text
                    }
                    
                    if(result.status === "success"){
                        const prevMessages = req.body.prevMessages
                        // i could definitely use prevMessages more better performace
                        // but alas this room is a sauna ... literally
                        console.log(req.body.prevMessages)
                        const messages = [...req.body.messages, req.body.msg, completion.data.choices[0].text]
                        prevMessages.shift()
                        prevMessages.shift()
                        prevMessages.push(req.body.msg)
                        prevMessages.push(completion.data.choices[0].text)
                        
                        console.log(completion.data.choices[0].text);
                        
                        result.status(200).send({prevMessages, messages})
                    }
            }).catch((err) => {
                    console.log(err)
                })
        }    
    })
}
