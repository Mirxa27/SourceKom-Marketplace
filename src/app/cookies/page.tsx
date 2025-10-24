'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Cookie, 
  Shield, 
  Settings,
  ArrowRight,
  Building,
  Mail,
  Phone
} from 'lucide-react'
import Link from 'next/link'

export default function CookiesPage() {
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
            Cookie Policy
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-muted-foreground">
            This policy explains how SourceKom uses cookies and similar technologies on our platform.
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
                  <Cookie className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle>What Are Cookies?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
                when you visit a website. They are widely used to make websites work more efficiently and 
                to provide information to website owners.
              </p>
              <p className="text-muted-foreground">
                Cookies allow us to recognize you when you return to our platform, remember your preferences, 
                and provide a more personalized experience. They also help us analyze how our platform is being 
                used and improve our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies are necessary for the operation of our platform and cannot be disabled. 
                  They include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Authentication cookies to keep you logged in</li>
                  <li>Security cookies to prevent fraud and protect your data</li>
                  <li>Session cookies to maintain your shopping cart and booking progress</li>
                  <li>Load balancing cookies to ensure platform stability</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Performance and Analytics Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies help us understand how visitors interact with our platform:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Google Analytics cookies to track page views and user behavior</li>
                  <li>Heat mapping cookies to understand how users navigate our site</li>
                  <li>Error tracking cookies to identify and fix technical issues</li>
                  <li>Performance monitoring cookies to optimize platform speed</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies enhance your experience by remembering your preferences:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Language and region preferences</li>
                  <li>Display settings and accessibility options</li>
                  <li>Remembering your search filters and browsing history</li>
                  <li>Personalized content recommendations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Marketing and Advertising Cookies</h3>
                <p className="text-muted-foreground mb-3">
                  These cookies are used to deliver relevant advertisements and marketing content:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Social media cookies for sharing content</li>
                  <li>Retargeting cookies for personalized advertising</li>
                  <li>Affiliate tracking cookies for partnership programs</li>
                  <li>Email marketing cookies to track campaign effectiveness</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <CardTitle>How We Use Cookies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Platform Functionality</h3>
                <p className="text-muted-foreground">
                  We use essential cookies to ensure our platform functions correctly, including maintaining 
                  your login session, processing transactions, and providing security features.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Personalization</h3>
                <p className="text-muted-foreground">
                  Cookies help us personalize your experience by remembering your preferences, showing relevant 
                  content based on your browsing history, and providing tailored recommendations.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Analytics and Improvement</h3>
                <p className="text-muted-foreground">
                  We analyze cookie data to understand how our platform is used, identify popular features, 
                  and make improvements to enhance user experience.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Marketing and Communication</h3>
                <p className="text-muted-foreground">
                  Marketing cookies help us deliver relevant advertisements and measure the effectiveness 
                  of our marketing campaigns across different channels.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Your Cookie Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cookie Consent Banner</h3>
                <p className="text-muted-foreground">
                  When you first visit our platform, you'll see a cookie consent banner where you can 
                  choose which types of cookies you're comfortable with. You can change these preferences 
                  at any time.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Browser Settings</h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                  <li>View all cookies stored on your device</li>
                  <li>Delete specific cookies or all cookies</li>
                  <li>Block cookies from specific websites</li>
                  <li>Set notifications when cookies are stored</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Cookie Settings Panel</h3>
                <p className="text-muted-foreground">
                  You can access our cookie settings panel at any time by clicking the "Cookie Settings" 
                  link in the footer of our platform or through your account preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our platform may use third-party services that set their own cookies. These include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Analytics Services</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Google Analytics</li>
                    <li>• Hotjar (heat mapping)</li>
                    <li>• Mixpanel (user analytics)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Marketing Services</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Google Ads</li>
                    <li>• Facebook Pixel</li>
                    <li>• LinkedIn Insight Tag</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground mt-4">
                Each third-party service has its own privacy policy and cookie policy. We encourage you 
                to review these policies to understand how they use your data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Session Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    These are temporary cookies that expire when you close your browser.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Persistent Cookies</h4>
                  <p className="text-sm text-muted-foreground">
                    These remain on your device for a set period or until you delete them. 
                    Our persistent cookies typically last between 30 days and 2 years.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Withdraw consent for cookies at any time</li>
                <li>Access information about cookies stored on your device</li>
                <li>Request deletion of your data collected through cookies</li>
                <li>File a complaint with data protection authorities if needed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this cookie policy from time to time to reflect changes in our use of cookies 
                or changes in applicable law. We will notify you of any material changes by posting the 
                updated policy on our platform and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this cookie policy or how we use cookies, please contact us:
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
              <h3 className="text-xl font-semibold mb-4">Ready to join SourceKom?</h3>
              <p className="text-muted-foreground mb-6">
                Start optimizing your business resources with our secure platform.
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