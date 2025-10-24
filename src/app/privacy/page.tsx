'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Eye, 
  Lock, 
  Database,
  ArrowRight,
  Building,
  Mail,
  Phone
} from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">SourceKom</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Privacy Policy
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: January 1, 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle>Information We Collect</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground">
                  When you register for an account, we collect information such as your name, email address, phone number, 
                  company details, and payment information. This information is necessary to provide our services and 
                  facilitate transactions on our platform.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage Data</h3>
                <p className="text-muted-foreground">
                  We automatically collect information about how you use our platform, including pages visited, 
                  time spent, resources downloaded, and interactions with other users. This helps us improve our 
                  services and provide personalized recommendations.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Business Information</h3>
                <p className="text-muted-foreground">
                  For business users, we may collect additional information such as company registration details, 
                  business size, industry, and specific resource requirements to better match you with suitable 
                  opportunities and services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>How We Use Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Provision</h3>
                <p className="text-muted-foreground">
                  We use your information to provide, maintain, and improve our resource sharing platform, 
                  including processing transactions, facilitating resource bookings, and providing customer support.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p className="text-muted-foreground">
                  We may use your contact information to send you important updates about your account, 
                  transaction notifications, and relevant business opportunities. You can opt out of marketing 
                  communications at any time.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Platform Improvement</h3>
                <p className="text-muted-foreground">
                  Usage data helps us understand how our platform is being used, identify areas for improvement, 
                  and develop new features that better serve our users' needs.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle>Data Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, secure servers, 
                  and regular security audits to protect your personal information from unauthorized access, 
                  alteration, or disclosure.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. You can request deletion of your account and associated 
                  data at any time.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Third-Party Sharing</h3>
                <p className="text-muted-foreground">
                  We do not sell your personal information to third parties. We only share your information 
                  with service providers who assist in operating our platform and with other users when necessary 
                  to facilitate transactions (e.g., sharing contact details for resource bookings).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle>Your Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Access and Correction</h3>
                <p className="text-muted-foreground">
                  You have the right to access and update your personal information at any time through 
                  your account settings or by contacting our support team.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Portability</h3>
                <p className="text-muted-foreground">
                  You can request a copy of your personal information in a structured, machine-readable format 
                  for your own use or to transfer to another service provider.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Objection and Restriction</h3>
                <p className="text-muted-foreground">
                  You have the right to object to or restrict the processing of your personal information 
                  in certain circumstances, such as for direct marketing purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our platform. 
                These include essential cookies for platform functionality, analytics cookies to understand usage patterns, 
                and marketing cookies to personalize content and advertisements.
              </p>
              <p className="text-muted-foreground">
                You can control cookie settings through your browser preferences. However, disabling certain cookies 
                may affect the functionality of our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                As a Saudi Arabian company, we primarily store and process data within Saudi Arabia. 
                However, we may use international service providers who process data outside of Saudi Arabia. 
                In such cases, we ensure appropriate safeguards are in place to protect your information 
                in accordance with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time to reflect changes in our practices 
                or applicable law. We will notify you of any material changes by posting the updated policy 
                on our platform and sending you an email notification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this privacy policy or how we handle your personal information, 
                please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">privacy@sourcekom.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+966 123 456 7890</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join SourceKom today and start optimizing your business resources.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}