'use server';

/**
 * @fileOverview A personalized brand recommendation AI agent.
 *
 * - personalizedBrandRecommendations - A function that handles the brand diagnostic quiz and returns personalized recommendations.
 * - QuizInput - The input type for the personalizedBrandRecommendations function.
 * - QuizOutput - The return type for the personalizedBrandRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuizInputSchema = z.object({
  question1: z
    .enum([
      'Tengo una marca, pero no se ve profesional.',
      'Tengo redes activas, pero no vendo.',
      'Estoy comenzando desde cero.',
      'Quiero escalar, pero no sé cómo hacerlo bien.',
    ])
    .describe('¿Cuál es tu situación actual?'),
  question2: z
    .enum([
      'Que mi marca no genera confianza.',
      'Que mis diseños no conectan ni venden.',
      'Que no tengo una web ni presencia digital.',
      'Que no sé cómo ordenar ni estructurar todo.',
    ])
    .describe('¿Qué es lo que más te preocupa hoy?'),
  question3: z
    .enum([
      'Yo lo hago todo (¡y ya no puedo más!).',
      'Tengo ayuda, pero no es estratégica.',
      'He invertido, pero no veo resultados.',
      'No he hecho nada aún.',
    ])
    .describe('¿Cómo manejás actualmente tu contenido o imagen de marca?'),
  question4: z
    .enum([
      'Aumentar ventas y visibilidad.',
      'Sentirme orgullosa de mi identidad visual.',
      'Delegar para tener más tiempo y crecer.',
      'Lanzar algo nuevo con una base sólida.',
    ])
    .describe('¿Qué te gustaría lograr con tu marca en los próximos 3 meses?'),
});
export type QuizInput = z.infer<typeof QuizInputSchema>;

const QuizOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('Personalized service recommendations based on quiz answers.'),
});
export type QuizOutput = z.infer<typeof QuizOutputSchema>;

export async function personalizedBrandRecommendations(input: QuizInput): Promise<QuizOutput> {
  return personalizedBrandRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBrandRecommendationsPrompt',
  input: {schema: QuizInputSchema},
  output: {schema: QuizOutputSchema},
  prompt: `Based on the user's answers to the following questions, provide personalized recommendations for Creati's services.

Question 1: {{{question1}}}
Question 2: {{{question2}}}
Question 3: {{{question3}}}
Question 4: {{{question4}}}

Consider the following service mappings:

*   **Identidad de marca**: Logo, naming, paleta, storytelling. Use when the user indicates issues with brand appearance, lack of professionalism, or wanting to feel proud of their visual identity.
*   **Presencia digital**: Web responsive, tienda online, apps. Use when the user mentions not having a website, lack of digital presence, or wanting to launch a web or online store.
*   **Marketing visual**: Contenido para redes, plantillas, anuncios. Use when the user is not selling with their active networks, designs are not connecting/converting, or wanting to increase sales and visibility.
*   **Finanzas estratégicas**: Guías de precios, escalabilidad, flujo de caja. Use when the user wants to scale but doesn't know how, needs help structuring their business, or wants to delegate tasks and have more free time.

Return a list of relevant service recommendations, tailored to the user's specific needs and pain points.
`,
});

const personalizedBrandRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBrandRecommendationsFlow',
    inputSchema: QuizInputSchema,
    outputSchema: QuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
