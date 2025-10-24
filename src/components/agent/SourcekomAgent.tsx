"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Send,
  Search,
  ShoppingCart,
  Package,
  Star,
  MapPin,
  DollarSign,
  User,
  LogIn,
  Plus,
  FileText,
  Settings,
  Minimize2,
  Maximize2,
  X,
  Bot,
  CheckCircle,
  Clock,
  Users,
  Building,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import PaymentModal from "./PaymentModal";

interface Message {
  id: string;
  type: "user" | "agent";
  content: string;
  timestamp: Date;
  actions?: string[];
  data?: any;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  price: number;
  isFree: boolean;
  location: string;
  rating: number;
  reviews: number;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  };
  thumbnail?: string;
}

export default function SourcekomAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      setUser(JSON.parse(userData));
    }

    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          type: "agent",
          content: `Hello! I'm Sourcekom Agent, your intelligent assistant for the SourceKom platform. I can help you:

🔍 **Find Resources**: Search for office spaces, equipment, legal services, and more
💼 **Make Purchases**: Complete transactions and bookings
📤 **Sell Resources**: List and manage your own resources
⚖️ **Legal Services**: Connect with legal experts and consultants
📊 **Account Help**: Manage your profile and dashboard

What would you like help with today?`,
          timestamp: new Date(),
          actions: ["show_help_options"],
        },
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(user?.token && { Authorization: `Bearer ${user.token}` }),
        },
        body: JSON.stringify({
          message: inputValue,
          conversationId: conversationId || undefined,
          userId: user?.id || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content: data.response,
          timestamp: new Date(),
          actions: data.actions,
          data: data.data,
        };

        setMessages((prev) => [...prev, agentMessage]);

        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "agent",
          content:
            "I apologize, but I encountered an error. Please try again or contact support if the issue persists.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === "user";

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isUser ? "bg-primary" : "bg-blue-100"
            }`}
          >
            {isUser ? (
              <User className="w-4 h-4 text-primary-foreground" />
            ) : (
              <Bot className="w-4 h-4 text-blue-600" />
            )}
          </div>
          <div
            className={`rounded-lg p-3 ${
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>

            {/* Render action buttons */}
            {message.actions && message.actions.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.actions.includes("display_search_results") &&
                  message.data?.searchResults && (
                    <div className="space-y-2">
                      {message.data.searchResults
                        .slice(0, 3)
                        .map((resource: Resource) => (
                          <Card key={resource.id} className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">
                                  {resource.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {resource.description}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge
                                    variant={
                                      resource.isFree ? "secondary" : "default"
                                    }
                                  >
                                    {resource.isFree
                                      ? "Free"
                                      : `SAR ${resource.price}`}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>{resource.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  setInputValue(
                                    `I'm interested in ${resource.title}`,
                                  )
                                }
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                Chat
                              </Button>
                            </div>
                          </Card>
                        ))}
                      {message.data.searchResults.length > 3 && (
                        <Button variant="outline" className="w-full">
                          View all {message.data.searchResults.length} results
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  )}

                {message.actions.includes("show_auth_options") && (
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Sign In</DialogTitle>
                          <DialogDescription>
                            Sign in to access personalized features and
                            transactions
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input placeholder="Email" type="email" />
                          <Input placeholder="Password" type="password" />
                          <Button className="w-full">Sign In</Button>
                          <div className="text-center">
                            <Link
                              href="/register"
                              className="text-sm text-primary hover:underline"
                            >
                              Don't have an account? Sign up
                            </Link>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create Account</DialogTitle>
                          <DialogDescription>
                            Join SourceKom to start sharing and discovering
                            resources
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input placeholder="Full Name" />
                          <Input placeholder="Email" type="email" />
                          <Input placeholder="Password" type="password" />
                          <Button className="w-full">Create Account</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {message.actions.includes("initiate_purchase") && (
                  <div className="space-y-2">
                    <Button className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Continue to Purchase
                    </Button>
                    {message.data?.requiresAuth && (
                      <p className="text-xs text-muted-foreground text-center">
                        You'll need to sign in to complete your purchase
                      </p>
                    )}
                  </div>
                )}

                {message.actions.includes("start_selling_flow") && (
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      List a Resource
                    </Button>
                    {message.data?.requiresAuth && (
                      <p className="text-xs text-muted-foreground text-center">
                        Sign in to start selling on SourceKom
                      </p>
                    )}
                  </div>
                )}

                {message.actions.includes("show_legal_services") && (
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/legal">
                        <FileText className="w-4 h-4 mr-2" />
                        Legal Services
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </div>
                )}

                {message.actions.includes("show_help_options") && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setInputValue("I want to search for office space")
                      }
                    >
                      <Building className="w-3 h-3 mr-1" />
                      Office Space
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("I need legal consultation")}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Legal Help
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("I want to sell a resource")}
                    >
                      <Package className="w-3 h-3 mr-1" />
                      Sell Resource
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setInputValue("I need help with my account")
                      }
                    >
                      <User className="w-3 h-3 mr-1" />
                      Account Help
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs opacity-50 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-50 bg-background border shadow-lg ${
        isFullscreen
          ? "inset-0 rounded-none"
          : isMinimized
            ? "bottom-4 right-4 w-80 h-14 rounded-lg"
            : "bottom-4 right-4 w-96 h-[600px] rounded-lg"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Bot className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Sourcekom Agent</h3>
            <p className="text-xs opacity-90">Your AI assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-8rem)]">
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about resources, legal services, or help..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("Show me available office spaces")}
                disabled={isLoading}
              >
                <Building className="w-3 h-3 mr-1" />
                Office Space
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("I need legal help")}
                disabled={isLoading}
              >
                <FileText className="w-3 h-3 mr-1" />
                Legal Help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue("How do I sell a resource?")}
                disabled={isLoading}
              >
                <Package className="w-3 h-3 mr-1" />
                Sell
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
