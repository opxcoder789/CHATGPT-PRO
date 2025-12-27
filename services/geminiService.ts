import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage, Role, Attachment } from "../types";
import { DEFAULT_MODEL } from "../constants";

// Helper to get the API key (Environment fallback)
const getEnvApiKey = () => (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

/**
 * Sends a message stream to the Gemini API
 */
export async function* streamChatResponse(
  history: ChatMessage[],
  newMessage: string,
  attachments: Attachment[] = [],
  modelId: string = DEFAULT_MODEL,
  customApiKey?: string
): AsyncGenerator<string, void, unknown> {

  // Determine which key to use: Custom -> Env -> Empty
  const finalApiKey = customApiKey?.trim() || getEnvApiKey() || '';
  
  if (!finalApiKey) {
      throw new Error("No API Key provided. Please set it in Settings.");
  }

  // Initialize client with the specific key for this request
  const ai = new GoogleGenAI({ apiKey: finalApiKey });

  // Prepare the chat history for the API
  const chatHistory = history.map(msg => {
    const parts: any[] = [];
    
    // Add attachments to history if they exist
    if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach(att => {
            parts.push({
                inlineData: {
                    mimeType: att.mimeType,
                    data: att.data
                }
            });
        });
    }
    
    // Add text part
    if (msg.text) {
        parts.push({ text: msg.text });
    } else if (parts.length === 0) {
        // Ensure at least one part exists if text is empty and no attachments
        // (This handles edge cases where a message might be empty in state)
        parts.push({ text: " " }); 
    }
    
    return {
        role: msg.role,
        parts: parts
    };
  });

  try {
    const chat = ai.chats.create({
      model: modelId,
      history: chatHistory,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    // Prepare new message parts
    const parts: any[] = [];
    
    // Add attachments
    if (attachments.length > 0) {
      attachments.forEach(att => {
        parts.push({
          inlineData: {
            mimeType: att.mimeType,
            data: att.data
          }
        });
      });
    }

    // Add text prompt only if not empty, or if it's the only part
    if (newMessage || parts.length === 0) {
        parts.push({ text: newMessage });
    }

    // Send the message
    // The SDK's sendMessageStream expects the `message` property to contain the content
    // It can be a string or an array of parts
    const resultStream = await chat.sendMessageStream({
      message: parts
    });

    for await (const chunk of resultStream) {
       const responseChunk = chunk as GenerateContentResponse;
       if (responseChunk.text) {
         yield responseChunk.text;
       }
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

/**
 * Helper to convert File to Base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = result.split(',')[1];
        resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};