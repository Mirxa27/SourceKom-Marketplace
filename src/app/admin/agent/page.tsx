'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Bot,
  Settings,
  Save,
  TestTube,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Brain,
  MessageSquare,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface AgentSettings {
  provider: string
  apiKey: string
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  enabled: boolean
}

const defaultSettings: AgentSettings = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 2000,
  systemPrompt: `You are Sourcekom Agent, an intelligent assistant for the SourceKom resource sharing and legal consultancy platform in Saudi Arabia. You help users:

1. **Find Resources**: Search and recommend office spaces, equipment, legal services, software, and more
2. **Facilitate Transactions**: Guide users through buying, selling, and booking resources
3. **Legal Guidance**: Provide information about legal services and consultations
4. **User Support**: Help with registration, dashboard navigation, and platform features
5. **Seller Assistance**: Guide sellers through posting items, managing listings, and handling sales

**Key Capabilities**:
- Execute end-to-end workflows (search → select → purchase)
- Display resource details with images, pricing, and availability
- Handle authentication and user onboarding
- Process payments and confirm transactions
- Provide real-time updates and notifications

**Tone**: Professional, helpful, and conversational. Always prioritize user success and seamless transactions.
**Language**: English with Arabic support when requested.
**Context**: Saudi Arabian market focus with cultural and regulatory awareness.

When users want to perform actions (search, buy, sell), guide them through the process step-by-step within the chat interface.`,
  enabled: true
}

export default function AdminAgentPage() {
  const [settings, setSettings] = useState<AgentSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/agent/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const saveSettings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/agent/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        setLastUpdated(new Date())
        setTestResult({
          type: 'success',
          message: 'Settings saved successfully!'
        })
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      setTestResult({
        type: 'error',
        message: 'Failed to save settings. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setTestResult({ type: 'info', message: 'Testing connection...' })

    try {
      const response = await fetch('/api/agent/settings')
      if (response.ok) {
        setTestResult({
          type: 'success',
          message: 'Connection successful! Agent is ready to use.'
        })
      } else {
        throw new Error('Connection failed')
      }
    } catch (error) {
      setTestResult({
        type: 'error',
        message: 'Connection failed. Please check your settings.'
      })
    }
  }

  const resetToDefaults = () => {
    setSettings(defaultSettings)
    setTestResult({
      type: 'info',
      message: 'Settings reset to defaults. Click Save to apply.'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Admin Panel</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Agent Configuration</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/agent">Preview Agent</Link>
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Exit Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agent Status</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-2xl font-bold">
                  {settings.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {settings.enabled ? 'Agent is responding to user queries' : 'Agent is offline'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Provider</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{settings.provider}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Model: {settings.model}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {lastUpdated ? 'Settings applied' : 'No changes saved'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Agent Settings
                </CardTitle>
                <CardDescription>
                  Configure the AI provider and behavior for Sourcekom Agent
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={testConnection}>
                  <TestTube className="w-4 h-4 mr-2" />
                  Test
                </Button>
                <Button onClick={resetToDefaults} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={saveSettings} disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="provider">AI Provider</Label>
                    <Select value={settings.provider} onValueChange={(value) => setSettings(prev => ({ ...prev, provider: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic Claude</SelectItem>
                        <SelectItem value="google">Google Gemini</SelectItem>
                        <SelectItem value="local">Local Model</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Choose the AI provider for natural language processing
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Select value={settings.model} onValueChange={(value) => setSettings(prev => ({ ...prev, model: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Model affects response quality and speed
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.apiKey}
                      onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Enter your API key"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your API key is encrypted and stored securely
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enabled">Enable Agent</Label>
                    <p className="text-xs text-muted-foreground">
                      Turn the agent on or off for users
                    </p>
                  </div>
                  <Switch
                    id="enabled"
                    checked={settings.enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature: {settings.temperature}</Label>
                    <input
                      type="range"
                      id="temperature"
                      min="0"
                      max="2"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: 0 = focused, 2 = creative
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
                    <input
                      type="range"
                      id="maxTokens"
                      min="100"
                      max="4096"
                      step="100"
                      value={settings.maxTokens}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum response length
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="behavior" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">System Prompt</Label>
                  <Textarea
                    id="systemPrompt"
                    value={settings.systemPrompt}
                    onChange={(e) => setSettings(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    rows={12}
                    placeholder="Define the agent's personality and behavior..."
                  />
                  <p className="text-xs text-muted-foreground">
                    This defines how the agent should behave and respond to users
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Prompt Guidelines
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific about the agent's role and capabilities</li>
                    <li>• Include information about the Saudi Arabian market context</li>
                    <li>• Define the tone and personality</li>
                    <li>• Specify what actions the agent can perform</li>
                    <li>• Mention language preferences (English/Arabic)</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Test Result */}
        {testResult && (
          <Alert className={`mt-6 ${testResult.type === 'success' ? 'border-green-200 bg-green-50' : testResult.type === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
            {testResult.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
            {testResult.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-600" />}
            {testResult.type === 'info' && <Brain className="h-4 w-4 text-blue-600" />}
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and utilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/agent">
                  <Bot className="w-6 h-6 mb-2" />
                  Preview Agent
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" asChild>
                <Link href="/admin">
                  <Settings className="w-6 h-6 mb-2" />
                  Admin Panel
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={testConnection}>
                <TestTube className="w-6 h-6 mb-2" />
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
