// netlify/functions/gemini.js
<RequestId>BF392FMPQ174KQWF</RequestI
// netlify/functions/gemini.js
// netlify/functions/gemini.js
<RequestId>BF392FMPQ174KQWF</RequestI
<RequestId>BF392FMPQ174KQWF</RequestI

copy con gemini.js
// netlify/functions/gemini.js
const { GoogleGenAI } = require("@google/genai");

exports.handler = async (event) => {
    if (!process.env.GEMINI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Serverless Function Error: API Key not set in Netlify Environment Variables." }),
        };
    }
    
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    const body = JSON.parse(event.body);
    const userPrompt = body.prompt;

    if (!userPrompt) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required 'prompt' in request body." }),
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                text: response.candidates[0].content.parts[0].text 
            }),
        };
    } catch (error) {
        console.error("Gemini API Call Failed:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Gemini API Execution Failed." }),
        };
    }
};cd ..
netlify deploy --prod --skip-functions-cache


netlify deploy --prod --skip-functions-cache
unctions bundling
컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴컴

Packaging Functions from functions directory:
 - gemini.js

