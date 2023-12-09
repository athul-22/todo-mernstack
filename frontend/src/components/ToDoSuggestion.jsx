import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Send request to PaLM API with the prompt on submit
    const submitPrompt = async () => {
      const apiKey = 'AIzaSyBZmmyAqMuALKBvpPrjBZYEhjHJcfOIdQ4'; // Replace with your PaLM API key
      const url = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage`;
      const data = {
        prompt: {
          context: '',
          examples: [],
          messages: [{ content: prompt }],
        },
        temperature: 0.25,
        top_k: 40,
        top_p: 0.95,
        candidate_count: 1,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      };

      try {
        const axiosResponse = await axios.post(url, data, { headers });
        console.log('Request:', data); // Print request for debugging
        console.log('Response:', axiosResponse); // Print response for debugging
        setResponse(axiosResponse.data.generated_text[0].text);
      } catch (error) {
        console.error(error);
      }
    };

    if (prompt) {
      submitPrompt();
    }
  }, [prompt]);

  return (
    <div>
      <h1>PaLM API Integration with React JS</h1>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={() => setPrompt('')}>Clear Prompt</button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default App;
