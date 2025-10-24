"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Shield,
  Building,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Heart,
  Zap,
  Globe,
  Handshake,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);

  const founderBio = `
    With over a decade of experience in business development and legal operations, from ground operations to higher management, Abdullah has a deep understanding of resource optimization and the Saudi Arabian market's legal landscape. His expertise spans across multiple industries and includes extensive experience in logistics, supply chain management, and regulatory compliance.

    Abdullah founded SourceKom with a vision to revolutionize how businesses share resources and navigate the complex Saudi market. His commitment to sustainability and efficiency drives the company's mission to connect businesses and maximize their potential.

    He holds an MBA with a specialization in International Business and has completed advanced certifications in logistics management and legal compliance. Under his leadership, SourceKom has become a trusted partner for over 500 businesses across Saudi Arabia.
  `;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">SourceKom</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link href="/about" className="text-foreground font-semibold">
              About
            </Link>
            <Link
              href="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/resources"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/legal"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Legal Services
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
              asChild
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
            About SourceKom
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] bg-clip-text text-transparent">
            Revolutionizing Business in Saudi Arabia
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SourceKom is an innovative resource sharing and legal consultancy
            platform operating in Saudi Arabia. The name "SourceKom" combines
            the English word "source" with "Kom," which means "Yours" in Arabic,
            expressing the company's concept of being the ideal resource partner
            clients can count on.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
              asChild
            >
              <Link href="/contact">
                Connect With Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--sourcekom-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[var(--sourcekom-blue)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--sourcekom-blue)] mb-2">
              500+
            </div>
            <div className="text-muted-foreground">Trusted Businesses</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[var(--sourcekom-yellow)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-[var(--sourcekom-yellow-dark)]" />
            </div>
            <div className="text-3xl font-bold text-[var(--sourcekom-yellow-dark)] mb-2">
              30%
            </div>
            <div className="text-muted-foreground">Cost Reduction</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-muted-foreground">Compliance</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
            <div className="text-muted-foreground">Saudi Cities</div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Company Overview</h2>
              <p className="text-muted-foreground mb-6">
                Founded by Abdullah Mirza, a motivated entrepreneur with over a
                decade of experience in business development, SourceKom is
                transforming the Saudi Arabian market by enabling businesses to
                exchange underutilized resources and providing expert legal
                consultancy, fostering a new era of efficiency and
                sustainability.
              </p>
              <p className="text-muted-foreground mb-6">
                Our platform combines deep local market knowledge with
                comprehensive legal expertise to help businesses optimize their
                operations, reduce costs, and achieve sustainable growth. We
                believe in the power of collaboration and shared resources to
                create a more efficient business ecosystem in Saudi Arabia.
              </p>
              <Button
                className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
                asChild
              >
                <Link href="/services">
                  Our Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[var(--sourcekom-blue)]/10 to-[var(--sourcekom-yellow)]/10 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Our Vision & Mission</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[var(--sourcekom-blue)]" />
                  Our Vision
                </h4>
                <p className="text-muted-foreground">
                  Revolutionizing the Saudi Arabian market by connecting
                  businesses to maximize potential and foster sustainable growth
                  through resource sharing and legal expertise.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-[var(--sourcekom-yellow-dark)]" />
                  Our Mission
                </h4>
                <p className="text-muted-foreground">
                  Empowering businesses by adding strength to their operations
                  and connectivity to their networks through innovative resource
                  sharing and expert legal guidance.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-purple-600" />
                  Our Values
                </h4>
                <p className="text-muted-foreground">
                  We believe in sustainability, innovation, collaboration, and
                  excellence. Our core values guide every aspect of our
                  operations and client relationships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
              Our Founder
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Abdullah Mirza</h2>
            <p className="text-muted-foreground mb-6">
              Founder & CEO, SourceKom
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[var(--sourcekom-blue)]/10 to-[var(--sourcekom-yellow)]/10 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    <Award className="w-16 h-16 text-[var(--sourcekom-blue)]" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  10+ Years Experience
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Professional Journey</CardTitle>
                    <Dialog
                      open={isFounderModalOpen}
                      onOpenChange={setIsFounderModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline">Full Bio</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Abdullah Mirza - Founder Bio
                          </DialogTitle>
                          <DialogDescription>
                            Detailed professional background and achievements
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 text-muted-foreground">
                          <p>{founderBio}</p>
                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <div>
                              <h4 className="font-semibold mb-2">Education</h4>
                              <p>• MBA, International Business</p>
                              <p>• Advanced Certifications in Logistics</p>
                              <p>• Legal Compliance Specialist</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">
                                Achievements
                              </h4>
                              <p>• 500+ Businesses Served</p>
                              <p>• Industry Innovation Award</p>
                              <p>• sustainability Leadership</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      With over a decade of experience in business development
                      and legal operations, from ground operations to higher
                      management, Abdullah has a deep understanding of resource
                      optimization and the Saudi Arabian market's legal
                      landscape.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                      <div className="text-center p-4 bg-[var(--sourcekom-blue)]/10 rounded-lg">
                        <div className="text-2xl font-bold text-[var(--sourcekom-blue)]">
                          15+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Years
                        </div>
                      </div>
                      <div className="text-center p-4 bg-[var(--sourcekom-yellow)]/10 rounded-lg">
                        <div className="text-2xl font-bold text-[var(--sourcekom-yellow-dark)]">
                          500+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Clients
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-100 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          25+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Projects
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-100 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          10+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Awards
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
              Our Services
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Comprehensive Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SourceKom offers comprehensive solutions to optimize your
              resources and enhance your business performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building className="w-8 h-8 text-[var(--sourcekom-blue)] mb-4" />
                <CardTitle>Resource Sharing</CardTitle>
                <CardDescription>
                  Platform for businesses to exchange underutilized resources,
                  creating new value and reducing waste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/resources">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-purple-600 mb-4" />
                <CardTitle>Legal Consultancy</CardTitle>
                <CardDescription>
                  Expert guidance on business licensing, documentation, and
                  compliance requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/legal">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-[var(--sourcekom-yellow-dark)] mb-4" />
                <CardTitle>Strategic Consulting</CardTitle>
                <CardDescription>
                  Expert guidance on business strategy, market positioning, and
                  growth opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 text-orange-600 mb-4" />
                <CardTitle>Operational Efficiency</CardTitle>
                <CardDescription>
                  Analysis and enhancement of business operations to maximize
                  productivity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="w-8 h-8 text-green-600 mb-4" />
                <CardTitle>Sustainability</CardTitle>
                <CardDescription>
                  Environmentally friendly business practices that also improve
                  profitability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-600 mb-4" />
                <CardTitle>Market Entry</CardTitle>
                <CardDescription>
                  Support for businesses entering or expanding within the Saudi
                  Arabian market.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
              Why Choose SourceKom
            </Badge>
            <h2 className="text-3xl font-bold mb-4">The SourceKom Advantage</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine local expertise with comprehensive legal knowledge to
              deliver exceptional value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--sourcekom-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-[var(--sourcekom-blue)]" />
                </div>
                <CardTitle>Local Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep understanding of Saudi Arabian market dynamics,
                  regulations, and business culture.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Legal Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive expertise in legal compliance, documentation,
                  and regulatory requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--sourcekom-yellow)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-8 h-8 text-[var(--sourcekom-yellow-dark)]" />
                </div>
                <CardTitle>Resource Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Innovative platform connecting businesses to share and
                  optimize underutilized resources.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Eco-friendly practices that benefit both businesses and the
                  environment while reducing costs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cutting-edge solutions and technologies to optimize business
                  operations and resource management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Trusted Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Extensive network of trusted businesses, partners, and
                  industry professionals across Saudi Arabia.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses already benefiting from SourceKom's
            resource sharing and legal expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-[var(--sourcekom-blue)]"
              asChild
            >
              <Link href="/resources">
                Explore Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
