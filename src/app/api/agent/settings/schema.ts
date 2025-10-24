import { z } from 'zod'

export const agentSettingsSchema = z.object({
  provider: z.string().min(1, 'Provider is required'),
  apiKey: z.string().min(1, 'API key is required'),
  model: z.string().min(1, 'Model is required'),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(4096),
  systemPrompt: z.string().min(1, 'System prompt is required'),
  enabled: z.boolean(),
})

export type AgentSettings = z.infer<typeof agentSettingsSchema>
