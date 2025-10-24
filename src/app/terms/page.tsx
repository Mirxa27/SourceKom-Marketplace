'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Shield, 
  AlertTriangle,
  ArrowRight,
  Building,
  Mail,
  Phone
} from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
            Terms of Service
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">
            These terms govern your use of SourceKom's resource sharing and legal consultancy platform.
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
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <CardTitle>Acceptance of Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using SourceKom's platform, you accept and agree to be bound by these Terms of Service 
                and our Privacy Policy. If you do not agree to these terms, you may not access or use our platform.
              </p>
              <p className="text-muted-foreground mt-4">
                These terms apply to all users of our platform, including without limitation users who are browsers, 
                vendors, customers, merchants, and/or contributors of content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle>Platform Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Resource Sharing</h3>
                <p className="text-muted-foreground">
                  SourceKom provides a platform for businesses to share, rent, and access various resources including 
                  office spaces, equipment, personnel, storage facilities, vehicles, and legal services. We facilitate 
                  transactions but do not own or control the resources listed on our platform.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Legal Consultancy</h3>
                <p className="text-muted-foreground">
                  Our platform connects users with qualified legal professionals for consultation services. 
                  While we facilitate these connections, the legal advice provided is the responsibility of the 
                  individual legal professionals.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Platform Availability</h3>
                <p className="text-muted-foreground">
                  We strive to maintain platform availability but do not guarantee uninterrupted service. 
                  We may update, modify, or discontinue services at our discretion.
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
                <CardTitle>User Responsibilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account. You must notify us immediately of any unauthorized use.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Accurate Information</h3>
                <p className="text-muted-foreground">
                  You agree to provide accurate, current, and complete information during registration and to keep 
                  your account information updated. Providing false or misleading information may result in account termination.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Compliance with Laws</h3>
                <p className="text-muted-foreground">
                  You must comply with all applicable Saudi Arabian laws and regulations when using our platform. 
                  This includes business licensing requirements, tax obligations, and industry-specific regulations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <CardTitle>Prohibited Activities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Illegal Activities</h3>
                <p className="text-muted-foreground">
                  You may not use our platform for any illegal purposes or to facilitate illegal activities. 
                  This includes but is not limited to fraud, money laundering, terrorist financing, and other 
                  criminal activities.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Misrepresentation</h3>
                <p className="text-muted-foreground">
                  You may not misrepresent your identity, qualifications, or the nature of resources you offer. 
                  All listings must be accurate and truthful.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Platform Abuse</h3>
                <p className="text-muted-foreground">
                  You may not attempt to gain unauthorized access to our systems, interfere with platform operations, 
                  or use automated tools to scrape or harvest data from our platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Transaction Processing</h3>
                <p className="text-muted-foreground">
                  All transactions on our platform are processed in Saudi Arabian Riyals (SAR). We use secure 
                  payment processors to handle transactions and may charge service fees for facilitating bookings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Refund Policy</h3>
                <p className="text-muted-foreground">
                  Refunds are handled according to the specific terms of each transaction and the policies 
                  set by individual resource providers. We facilitate dispute resolution but do not guarantee 
                  refunds except where required by law.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Taxes</h3>
                <p className="text-muted-foreground">
                  Users are responsible for any applicable taxes, including VAT, on transactions conducted 
                  through our platform. We may collect and remit taxes as required by Saudi Arabian law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The SourceKom platform, including its design, text, graphics, and functionality, is owned by 
                SourceKom and protected by intellectual property laws. You may not copy, modify, distribute, 
                or create derivative works without our express written permission.
              </p>
              <p className="text-muted-foreground">
                Users retain ownership of content they post on our platform but grant us a license to use, 
                modify, and display such content for the purpose of operating and improving our services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, SourceKom shall not be liable for any indirect, 
                incidental, special, or consequential damages arising from your use of our platform.
              </p>
              <p className="text-muted-foreground mb-4">
                Our total liability for any claims arising from your use of the platform shall not exceed 
                the amount you paid to us in the twelve (12) months preceding the claim.
              </p>
              <p className="text-muted-foreground">
                We do not guarantee the accuracy, reliability, or quality of resources or services provided 
                by third parties through our platform. All such arrangements are between you and the service provider.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Platform Disputes</h3>
                <p className="text-muted-foreground">
                  We encourage users to resolve disputes directly with each other. Our support team may 
                  assist in mediation but is not obligated to resolve disputes between users.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Legal Disputes</h3>
                <p className="text-muted-foreground">
                  Any legal disputes arising from these terms shall be governed by the laws of Saudi Arabia 
                  and resolved in the courts of Riyadh, Saudi Arabia.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account at any time, with or without cause, with or without notice. 
                Upon termination, your right to use the platform will cease immediately.
              </p>
              <p className="text-muted-foreground">
                You may terminate your account at any time by contacting our support team or through your account settings. 
                Certain provisions of these terms shall survive termination, including payment obligations and liability limitations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">legal@sourcekom.com</p>
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
                Start sharing resources and growing your business today.
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