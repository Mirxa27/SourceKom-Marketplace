import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sourcekom Agent - AI Assistant | SourceKom',
  description: 'Chat with our AI-powered assistant to find resources, make purchases, and get help with legal services on the SourceKom platform.',
  keywords: ['AI Assistant', 'Chatbot', 'SourceKom', 'Resource Sharing', 'Legal Services', 'Saudi Arabia'],
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
