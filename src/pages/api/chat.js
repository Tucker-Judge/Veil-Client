import { Configuration, OpenAIApi} from 'openai'

export default (req, res) => {
// handle prevMessages after calling to openai
    if (req.method === "POST") {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const completion = async() => await openai.createChatCompletion({ 
            "model": "gpt-3.5-turbo",
            "messages": [
                // role rotates based on input
                // Corrective Conversation Translation Scenario
                {"role": "system", "content": `You are a learning partner for chatting in other languages. The previous words exchanged are the following stay with the conversation -- ${prevMessages}`},
                {"role": "user", "content": msg},
            ]
        });
        if(completion.status === "success"){
            const prev = req.body.prevMessages
            prev.shift()
            prev.shift()
            prev.push(req.body.msg)
            prev.push(completion.res)

            console.log(completion.data.choices[0].text);
            
            
            res.status(200).send({prev})
        }
    }  
}
