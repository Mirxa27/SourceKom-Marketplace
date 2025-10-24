"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const ChatContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col h-full bg-background rounded-lg border",
      className
    )}
    {...props}
  />
))
ChatContainer.displayName = "ChatContainer"

const ChatHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-4 border-b",
      className
    )}
    {...props}
  />
))
ChatHeader.displayName = "ChatHeader"

const ChatMessages = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 overflow-y-auto p-4 space-y-4",
      className
    )}
    {...props}
  />
))
ChatMessages.displayName = "ChatMessages"

const ChatInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-4 border-t",
      className
    )}
    {...props}
  />
))
ChatInput.displayName = "ChatInput"

const MessageBubble = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "user" | "assistant"
  }
>(({ className, variant = "assistant", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex gap-3 max-w-[80%]",
      variant === "user" ? "ml-auto" : "mr-auto",
      className
    )}
    {...props}
  />
))
MessageBubble.displayName = "MessageBubble"

const MessageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "user" | "assistant"
  }
>(({ className, variant = "assistant", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg p-3 text-sm",
      variant === "user"
        ? "bg-primary text-primary-foreground ml-auto"
        : "bg-muted mr-auto",
      className
    )}
    {...props}
  />
))
MessageContent.displayName = "MessageContent"

export {
  ChatContainer,
  ChatHeader,
  ChatMessages,
  ChatInput,
  MessageBubble,
  MessageContent,
}
