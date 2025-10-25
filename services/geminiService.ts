
import { GoogleGenAI, Type } from "@google/genai";
import type { Threat } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const threatSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'The name of the threat or IOC, e.g., "Trojan.GenericKD.314251"',
    },
    type: {
      type: Type.STRING,
      description: 'The category of the threat, e.g., "Malware", "Suspicious Process"',
    },
    severity: {
      type: Type.STRING,
      enum: ['High', 'Medium', 'Low', 'Informational'],
      description: 'The severity level of the threat.',
    },
    description: {
      type: Type.STRING,
      description: 'A brief, technical description of the threat and its potential impact.',
    },
  },
  required: ['name', 'type', 'severity', 'description'],
};

export const generateThreats = async (): Promise<Threat[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a cybersecurity threat intelligence simulator for a tool called "OTX Endpoint Security".
      Your task is to generate a realistic-looking list of potential threats found on an endpoint computer.
      The response must be in JSON format, adhering to the provided schema.

      Generate a JSON array containing between 0 and 5 threat objects.
      If you generate 0 threats, return an empty array [].
      Each threat object should represent an Indicator of Compromise (IOC).

      Possible threat types include: "Malware", "Suspicious Process", "Malicious Network Connection", "Phishing URL in Cache", "Vulnerable Software".
      Make the names and descriptions sound plausible and technical.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: threatSchema,
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      return [];
    }
    
    const threats = JSON.parse(jsonText);
    return threats as Threat[];

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // In case of an API error, let's return a sample error threat to demonstrate the UI
     return [
        {
          name: "API_Communication_Error",
          type: "Scanner Error",
          severity: "High",
          description: "Failed to communicate with the threat intelligence service. Please check your connection and API key.",
        } as Threat
     ];
  }
};
