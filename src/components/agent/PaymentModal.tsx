'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ShoppingCart,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Banknote,
  Wallet
} from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  resource: {
    id: string
    title: string
    price: number
    isFree: boolean
    description: string
  }
  user?: {
    name: string
    email: string
  }
  onPaymentComplete: (paymentData: any) => void
  paymentData?: {
    paymentUrl: string
    paymentId: string
  }
}

export default function PaymentModal({
  isOpen,
  onClose,
  resource,
  user,
  onPaymentComplete,
  paymentData
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'bank'>('card')
  const [paymentComplete, setPaymentComplete] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)

    if (paymentData?.paymentUrl) {
      // Redirect to payment gateway
      window.open(paymentData.paymentUrl, '_blank')

      // Simulate payment completion for demo
      setTimeout(() => {
        setPaymentComplete(true)
        onPaymentComplete({
          paymentId: paymentData.paymentId,
          status: 'completed',
          amount: resource.price,
          resourceId: resource.id
        })
        setIsLoading(false)
      }, 3000)
    }
  }

  const handleFreeResource = () => {
    setIsLoading(true)

    // Simulate download/claim process
    setTimeout(() => {
      setPaymentComplete(true)
      onPaymentComplete({
        status: 'completed',
        amount: 0,
        resourceId: resource.id
      })
      setIsLoading(false)
    }, 1500)
  }

  const resetModal = () => {
    setPaymentComplete(false)
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Complete Purchase
          </DialogTitle>
          <DialogDescription>
            Secure payment through our trusted partners
          </DialogDescription>
        </DialogHeader>

        {!paymentComplete ? (
          <div className="space-y-6">
            {/* Resource Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant={resource.isFree ? "secondary" : "default"}>
                        {resource.isFree ? "Free" : `SAR ${resource.price}`}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Digital Resource
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Info */}
            {user && (
              <div className="space-y-2">
                <Label>Customer Information</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </div>
            )}

            {!resource.isFree ? (
              <>
                {/* Payment Methods */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      className="flex-col h-16"
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="w-4 h-4 mb-1" />
                      <span className="text-xs">Card</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                      className="flex-col h-16"
                      onClick={() => setPaymentMethod('wallet')}
                    >
                      <Wallet className="w-4 h-4 mb-1" />
                      <span className="text-xs">Wallet</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'bank' ? 'default' : 'outline'}
                      className="flex-col h-16"
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <Banknote className="w-4 h-4 mb-1" />
                      <span className="text-xs">Bank</span>
                    </Button>
                  </div>
                </div>

                {/* Security Badge */}
                <Alert>
                  <Shield className="w-4 h-4" />
                  <AlertDescription className="text-xs">
                    Your payment information is encrypted and secure. We use industry-standard security measures.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <Alert>
                <CheckCircle className="w-4 h-4" />
                <AlertDescription>
                  This is a free resource. You can claim it instantly without any payment.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {resource.isFree ? (
                <Button
                  className="w-full"
                  onClick={handleFreeResource}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Claim Free Resource
                    </>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handlePayment}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay SAR {resource.price}
                      </>
                    )}
                  </Button>
                  {paymentData?.paymentUrl && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(paymentData.paymentUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Payment Page
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              {resource.isFree
                ? 'You have successfully claimed this free resource.'
                : 'Your payment has been processed successfully.'
              }
            </p>
            <div className="space-y-2">
              <Button className="w-full" onClick={resetModal}>
                View Resource
              </Button>
              <Button variant="outline" className="w-full" onClick={resetModal}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
