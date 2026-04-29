export const config = {
  runtime: 'edge',
};

import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Atua como Josh Segatt. És um especialista em SaaS, IA e Performance. O teu objetivo é vender Tech Sprints ($1k-$5k) e Arquitetura Enterprise. Se o cliente tiver uma dor real, guia-o para o formulário de /intake. Responde de forma curta, técnica e autoritária. Nunca dês código completo de graça; vende a execução.`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not defined in the environment variables.');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // [LOGICA NUCLEAR] Limpeza Absoluta
    let cleanHistory = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || m.parts?.[0]?.text || "" }]
    }));

    // Remove TUDO do início até encontrar a primeira mensagem de 'user'
    const firstUserIndex = cleanHistory.findIndex((m: any) => m.role === 'user');
    if (firstUserIndex === -1) {
      cleanHistory = [];
    } else {
      cleanHistory = cleanHistory.slice(firstUserIndex);
    }

    // Extrair a última mensagem para o sendMessageStream
    const lastMessageObj = cleanHistory.pop();
    const latestMessage = lastMessageObj?.parts[0]?.text || "";

    // [TAREFA 1] Inicialização do Modelo com System Instruction
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: SYSTEM_PROMPT
    });

    // [TAREFA 2] Log de Produção
    console.log("FINAL HISTORY:", JSON.stringify(cleanHistory));
    console.log("LATEST MESSAGE:", latestMessage);

    // Iniciar Chat
    const chat = model.startChat({
      history: cleanHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessageStream(latestMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
