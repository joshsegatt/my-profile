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

    // 2. Extração da última mensagem (User Message)
    const userMessage = messages[messages.length - 1].content;

    // 3. Limpeza agressiva do histórico (O resto das mensagens)
    const history = messages.slice(0, -1)
      .map((m: any) => ({
        role: (m.role === 'assistant' || m.role === 'model') ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))
      .filter((m: any) => m.parts[0].text && m.parts[0].text.trim() !== "");

    // 4. REGRA DE OURO (CORREÇÃO DO ERRO):
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift(); // Remove qualquer mensagem do bot que esteja no topo do histórico
    }

    // [TAREFA 1] Inicialização do Modelo (Usando -latest para evitar 404)
    const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash-latest',
        systemInstruction: SYSTEM_PROMPT
    });

    // [LOG DE EMERGÊNCIA]
    console.log("PAYLOAD ENVIADO AO GEMINI:", JSON.stringify(history));

    // Iniciar Chat
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessageStream(userMessage);

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
