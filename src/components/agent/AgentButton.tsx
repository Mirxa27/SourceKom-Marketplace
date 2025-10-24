'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  Package
} from 'lucide-react'
import Link from 'next/link'

export default function AgentButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/agent">
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-16 px-6 rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-white">AI Assistant</div>
            <div className="text-xs text-white/80">Chat with Sourcekom Agent</div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm">Search & Discover Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Buy & Sell in Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Get Personalized Help</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
                <Badge variant="outline" className="text-xs">
                  24/7 Available
                </Badge>
              </div>
            </div>
          </div>
        )}
      </Button>
    </Link>
  )
}
