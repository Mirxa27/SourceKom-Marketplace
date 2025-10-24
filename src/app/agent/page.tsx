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
  Filter,
  Grid,
  List,
  Heart,
  Share2,
} from "lucide-react";
import Link from "next/link";

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

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
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
          content: `Welcome to Sourcekom Agent! 🤖

I'm your intelligent assistant for the SourceKom platform in Saudi Arabia. I can help you with:

🔍 **Find Resources** - Search for office spaces, equipment, legal services, software, and more
💼 **Complete Transactions** - Guide you through buying, booking, and paying for resources
📤 **Sell Resources** - Help you list, manage, and sell your own resources
⚖️ **Legal Services** - Connect you with legal experts and consultations
📊 **Account Management** - Help with registration, dashboard navigation, and settings

**Getting Started:**
• Try asking: "Show me office spaces in Riyadh"
• Or: "I need legal consultation for my business"
• Or: "How do I list a resource for sale?"

I can execute complete workflows right here in our chat - from search to purchase! What would you like to explore today?`,
          timestamp: new Date(),
          actions: ["show_welcome_options"],
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
          context: {
            searchQuery: inputValue,
            categoryId:
              selectedCategory !== "all" ? selectedCategory : undefined,
          },
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

        // Update search results if available
        if (data.data?.searchResults) {
          setSearchResults(data.data.searchResults);
        }

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
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
      >
        <div
          className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3 max-w-[80%]`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              isUser
                ? "bg-primary"
                : "bg-gradient-to-br from-blue-500 to-purple-600"
            }`}
          >
            {isUser ? (
              <User className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
          <div
            className={`rounded-2xl p-4 ${
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>

            {/* Render action buttons */}
            {message.actions && message.actions.length > 0 && (
              <div className="mt-4 space-y-3">
                {message.actions.includes("display_search_results") &&
                  message.data?.searchResults && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Search Results</h4>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setViewMode(viewMode === "grid" ? "list" : "grid")
                            }
                          >
                            {viewMode === "grid" ? (
                              <List className="w-4 h-4" />
                            ) : (
                              <Grid className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                            : "space-y-3"
                        }
                      >
                        {message.data.searchResults
                          .slice(0, 6)
                          .map((resource: Resource) => (
                            <Card
                              key={resource.id}
                              className="hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm mb-1">
                                      {resource.title}
                                    </h5>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                      {resource.description}
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge
                                        variant={
                                          resource.isFree
                                            ? "secondary"
                                            : "default"
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
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <MapPin className="w-3 h-3" />
                                      <span>{resource.location}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setCurrentResource(resource);
                                        setInputValue(
                                          `I'm interested in ${resource.title}`,
                                        );
                                      }}
                                    >
                                      <MessageCircle className="w-3 h-3 mr-1" />
                                      Chat
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        setInputValue(
                                          `I want to buy ${resource.title}`,
                                        )
                                      }
                                    >
                                      <ShoppingCart className="w-3 h-3 mr-1" />
                                      Buy
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>

                      {message.data.searchResults.length > 6 && (
                        <Button variant="outline" className="w-full">
                          View all {message.data.searchResults.length} results
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  )}

                {message.actions.includes("show_welcome_options") && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() =>
                        setInputValue(
                          "Show me available office spaces in Riyadh",
                        )
                      }
                    >
                      <Building className="w-6 h-6 mb-2" />
                      <span className="text-xs">Office Space</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() =>
                        setInputValue(
                          "I need legal consultation for my business",
                        )
                      }
                    >
                      <FileText className="w-6 h-6 mb-2" />
                      <span className="text-xs">Legal Services</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() =>
                        setInputValue(
                          "I want to sell equipment on your platform",
                        )
                      }
                    >
                      <Package className="w-6 h-6 mb-2" />
                      <span className="text-xs">Sell Resource</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex-col"
                      onClick={() => setInputValue("Help me create an account")}
                    >
                      <User className="w-6 h-6 mb-2" />
                      <span className="text-xs">Account Help</span>
                    </Button>
                  </div>
                )}

                {message.actions.includes("show_auth_options") && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">
                      Authentication Required
                    </h4>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => (window.location.href = "/login")}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => (window.location.href = "/register")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Account
                      </Button>
                    </div>
                  </Card>
                )}

                {message.actions.includes("initiate_purchase") && (
                  <Card className="p-4 bg-green-50 border-green-200">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Ready to Purchase
                    </h4>
                    <div className="space-y-3">
                      {currentResource && (
                        <div className="p-3 bg-white rounded-lg">
                          <h5 className="font-medium">
                            {currentResource.title}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {currentResource.isFree
                              ? "Free"
                              : `SAR ${currentResource.price}`}
                          </p>
                        </div>
                      )}
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          if (user) {
                            setInputValue("Complete my purchase");
                          } else {
                            window.location.href = "/login";
                          }
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {user ? "Proceed to Payment" : "Sign In to Purchase"}
                      </Button>
                    </div>
                  </Card>
                )}

                {message.actions.includes("start_selling_flow") && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Start Selling</h4>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        List your resources and reach thousands of businesses in
                        Saudi Arabia
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => {
                          if (user) {
                            window.location.href = "/upload";
                          } else {
                            window.location.href = "/register";
                          }
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {user ? "Create Listing" : "Sign Up to Sell"}
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            )}

            <div className="text-xs opacity-50 mt-2">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Sourcekom Agent</h1>
                <p className="text-sm text-muted-foreground">
                  Your AI-powered business assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              ) : (
                <Button onClick={() => (window.location.href = "/login")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
              >
                <X className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar - Search Results */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {searchResults.length > 0 ? (
                  <div className="space-y-2 p-4 max-h-[600px] overflow-y-auto">
                    {searchResults.map((resource) => (
                      <Card
                        key={resource.id}
                        className={`cursor-pointer transition-all ${
                          currentResource?.id === resource.id
                            ? "ring-2 ring-primary"
                            : ""
                        }`}
                        onClick={() => setCurrentResource(resource)}
                      >
                        <CardContent className="p-3">
                          <h5 className="font-medium text-sm mb-1 line-clamp-1">
                            {resource.title}
                          </h5>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                resource.isFree ? "secondary" : "default"
                              }
                            >
                              {resource.isFree
                                ? "Free"
                                : `SAR ${resource.price}`}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      Search for resources to see results here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Conversation
                    </CardTitle>
                    <CardDescription>
                      Ask me anything about resources, services, or help
                    </CardDescription>
                  </div>
                  {user && (
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Authenticated
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {messages.map(renderMessage)}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-muted rounded-2xl p-4">
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
                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2 mb-3">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about resources, legal services, or help..."
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
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setInputValue("Show me office spaces in Riyadh")
                      }
                      disabled={isLoading}
                    >
                      <Building className="w-3 h-3 mr-1" />
                      Office Space
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue("I need legal consultation")}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setInputValue("What services do you offer?")
                      }
                      disabled={isLoading}
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Services
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Current Resource */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Current Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {currentResource ? (
                  <div className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                      <Package className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {currentResource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {currentResource.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Price</span>
                        <Badge
                          variant={
                            currentResource.isFree ? "secondary" : "default"
                          }
                        >
                          {currentResource.isFree
                            ? "Free"
                            : `SAR ${currentResource.price}`}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-sm">
                            {currentResource.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Location</span>
                        <span className="text-sm text-muted-foreground">
                          {currentResource.location}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Category</span>
                        <Badge variant="outline">
                          {currentResource.category.name}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <Button
                        className="flex-1"
                        onClick={() =>
                          setInputValue(
                            `I want to buy ${currentResource.title}`,
                          )
                        }
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Select a resource to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
