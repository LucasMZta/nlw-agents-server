import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
   apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
   const response = await gemini.models.generateContent({
      model,
      contents: [
         {
            text: 'Transcreva o audio para português do Brasil, seja preciso e natural na transcrição, mantenha a pontuação e regras adequadas, e divida o texto em paragrafos quando for apropriado.',
         },
         {
            inlineData: {
               mimeType,
               data: audioAsBase64,
            },
         },
      ],
   })

   if (!response.text) {
      throw new Error('Não foi possível converter o áudio')
   }

   return response.text
}

export async function generateEmbeddings(text: string) {
   const response = await gemini.models.embedContent({
      model: 'text-embedding-004',
      contents: [{ text }],
      config: {
         taskType: 'RETRIEVAL_DOCUMENT',
      },
   })

   if (!response.embeddings?.[0].values) {
      throw new Error('Its not possible to generate the embegginds')
   }

   return response.embeddings[0].values
}

export async function generateAnswer(
   question: string,
   transcriptions: string[]
) {
   const context = transcriptions.join('\n\n')

   const prompt = `
      Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.

      Contexto: ${context}
      Pergunta: ${question}

      INSTRUÇÕES:
      - use apenas informações contidas no contexto enviado;
      - se a resposta nao for encontrada no contexto, apenas responda que nao possui informações suficientees para responder
      - seja objetivo
      - mantenha um tom educativo e profissional
      - cite trechos relevantes do contexto se apropriado
      - se for citar o contexto, utilize o termo "conteudo da aula"
   
   `.trim()

   const response = await gemini.models.generateContent({
      model,
      contents: [
         {
            text: prompt,
         },
      ],
   })

   if (!response.text) {
      throw new Error('Its not possible to generate the answer')
   }

   return response.text

}
