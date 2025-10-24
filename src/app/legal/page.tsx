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
  FileText,
  Scale,
  Shield,
  Gavel,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  Star,
  DollarSign,
  Calendar,
  MessageCircle,
  BookOpen,
  Building,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
  const [selectedService, setSelectedService] = useState("all");

  const legalServices = [
    {
      id: "corporate",
      title: "Corporate Law Services",
      description:
        "Comprehensive corporate legal services including company formation, governance, compliance, and corporate restructuring.",
      icon: Building,
      color: "blue",
      duration: "1-3 months",
      rating: 4.9,
      reviews: 142,
      services: [
        "Company formation and registration",
        "Corporate governance advice",
        "Board and shareholder agreements",
        "Mergers and acquisitions support",
        "Corporate restructuring and reorganization",
        "Compliance and regulatory advice",
      ],
      benefits: [
        "Legal entity establishment",
        "Corporate structure optimization",
        "Regulatory compliance assurance",
        "Risk mitigation strategies",
      ],
      pricing: "SAR 5,000 - SAR 25,000",
    },
    {
      id: "contracts",
      title: "Contract Review and Drafting",
      description:
        "Professional contract services including drafting, review, negotiation, and management of all types of business contracts.",
      icon: FileText,
      color: "purple",
      duration: "1-4 weeks",
      rating: 4.8,
      reviews: 89,
      services: [
        "Contract drafting and creation",
        "Contract review and analysis",
        "Negotiation support and advice",
        "Contract management systems",
        "Contract modification and amendments",
        "Contract dispute resolution",
      ],
      benefits: [
        "Comprehensive contract protection",
        "Risk identification and mitigation",
        "Clear and enforceable terms",
        "Contract lifecycle management",
      ],
      pricing: "SAR 1,000 - SAR 8,000",
    },
    {
      id: "compliance",
      title: "Regulatory Compliance",
      description:
        "Expert guidance on Saudi Arabian regulations, licensing requirements, and compliance frameworks for various industries.",
      icon: Shield,
      color: "green",
      duration: "Ongoing support",
      rating: 4.7,
      reviews: 67,
      services: [
        "Regulatory compliance audits",
        "License application assistance",
        "Compliance framework development",
        "Regulatory monitoring and updates",
        "Compliance training programs",
        "Risk assessment and mitigation",
      ],
      benefits: [
        "Full regulatory compliance",
        "License acquisition support",
        "Risk reduction strategies",
        "Regulatory efficiency optimization",
      ],
      pricing: "SAR 3,000 - SAR 15,000 annually",
    },
    {
      id: "consultation",
      title: "Legal Consultation",
      description:
        "Expert legal advice and consultation services for businesses navigating the Saudi Arabian legal landscape.",
      icon: MessageCircle,
      color: "orange",
      duration: "Session-based",
      rating: 4.9,
      reviews: 123,
      services: [
        "Legal advice and counseling",
        "Legal risk assessment",
        "Strategic legal planning",
        "Issue resolution support",
        "Legal research and analysis",
        "Expert witness services",
      ],
      benefits: [
        "Expert legal guidance",
        "Strategic legal planning",
        "Risk mitigation strategies",
        "Comprehensive legal support",
      ],
      pricing: "SAR 500 - SAR 2,000 per session",
    },
    {
      id: "documentation",
      title: "Legal Documentation",
      description:
        "Professional preparation and management of legal documents, forms, and filings required for business operations.",
      icon: BookOpen,
      color: "red",
      duration: "1-2 weeks",
      rating: 4.6,
      reviews: 78,
      services: [
        "Legal document preparation",
        "Application form completion",
        "Document notarization support",
        "Document translation services",
        "Document filing assistance",
        "Document management systems",
      ],
      benefits: [
        "Accurate document preparation",
        "Timely submission and filing",
        "Compliance with requirements",
        "Efficient document management",
      ],
      pricing: "SAR 500 - SAR 5,000",
    },
  ];

  const filteredServices =
    selectedService === "all"
      ? legalServices
      : legalServices.filter((service) => service.id === selectedService);

  const selectedServiceData = legalServices.find(
    (service) => service.id === selectedService,
  );

  const LegalServiceCard = ({ service }: { service: any }) => {
    const Icon = service.icon;
    const colorClasses = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      green: "text-green-600",
      orange: "text-orange-600",
      red: "text-red-600",
    };

    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon
                className={`w-6 h-6 ${colorClasses[service.color as keyof typeof colorClasses]}`}
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  <span className="text-sm">{service.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  • {service.reviews} reviews
                </span>
                <span className="text-sm text-muted-foreground">
                  • {service.duration}
                </span>
              </div>
            </div>
          </div>
          <CardDescription className="mt-4">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Key Services</h4>
              <ul className="space-y-1">
                {service.services
                  .slice(0, 3)
                  .map((serviceItem: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {serviceItem}
                    </li>
                  ))}
                {service.services.length > 3 && (
                  <li className="text-sm text-muted-foreground">
                    +{service.services.length - 3} more services...
                  </li>
                )}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <Link href={`/legal/${service.id}`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <Icon
                        className={`w-6 h-6 ${colorClasses[service.color as keyof typeof colorClasses]}`}
                      />
                      {service.title}
                    </DialogTitle>
                    <DialogDescription>
                      Detailed information about this legal service
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Overview</h4>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">
                          Services Included
                        </h4>
                        <ul className="space-y-2">
                          {service.services.map(
                            (serviceItem: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{serviceItem}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {service.benefits.map(
                            (benefit: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <Shield className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{benefit}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 bg-muted/50 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--sourcekom-blue)]">
                          {service.rating}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average Rating
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[var(--sourcekom-yellow-dark)]">
                          {service.reviews}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Client Reviews
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {service.pricing}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Pricing Range
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1" asChild>
                        <Link href={`/legal/${service.id}`}>
                          Request Service
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/contact">Book Consultation</Link>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary-foreground" />
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
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
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
            <Link href="/legal" className="text-foreground font-semibold">
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
        {/* Page Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge className="mb-6 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
              Legal Services
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Expert Legal Consultancy
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Comprehensive legal services to ensure your business operates
              smoothly within Saudi Arabia's legal framework while maximizing
              opportunities.
            </p>
          </div>

          {/* Service Categories */}
          <Tabs
            value={selectedService}
            onValueChange={setSelectedService}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="consultation">Consultation</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Service (if specific service selected) */}
        {selectedServiceData && selectedService !== "all" && (
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white">
              <CardContent className="pt-12 pb-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <selectedServiceData.icon className="w-8 h-8" />
                      <h2 className="text-3xl font-bold">
                        {selectedServiceData.title}
                      </h2>
                    </div>
                    <p className="text-lg mb-6 opacity-90">
                      {selectedServiceData.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {selectedServiceData.benefits
                        .slice(0, 3)
                        .map((benefit: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-white/20 border-white/20 text-white"
                          >
                            {benefit}
                          </Badge>
                        ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        className="bg-white text-[var(--sourcekom-blue)] hover:bg-gray-100"
                        size="lg"
                        asChild
                      >
                        <Link href={`/legal/${selectedServiceData.id}`}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-[var(--sourcekom-blue)]"
                        asChild
                      >
                        <Link href="/contact">Request Consultation</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold mb-2">
                        {selectedServiceData.rating}
                      </div>
                      <div className="text-sm opacity-90">Average Rating</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold mb-2">
                        {selectedServiceData.reviews}
                      </div>
                      <div className="text-sm opacity-90">Client Reviews</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold mb-2">
                        {selectedServiceData.duration}
                      </div>
                      <div className="text-sm opacity-90">Duration</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold mb-2">
                        {selectedServiceData.pricing}
                      </div>
                      <div className="text-sm opacity-90">Pricing</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid gap-6">
          {filteredServices.map((service) => (
            <LegalServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Legal Expertise Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Legal Expertise</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of legal experts specializes in Saudi Arabian business
              law and regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[var(--sourcekom-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-[var(--sourcekom-blue)]" />
                </div>
                <CardTitle>Specialized Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep expertise in Saudi Arabian business laws, regulations,
                  and compliance requirements.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gavel className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensuring your business meets all regulatory requirements and
                  stays compliant with local laws.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[var(--sourcekom-yellow)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-[var(--sourcekom-yellow-dark)]" />
                </div>
                <CardTitle>Business Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Strategic legal advice to support business expansion,
                  partnerships, and market entry.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive risk assessment and mitigation strategies to
                  protect your business interests.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">Need Legal Guidance?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our legal experts are ready to help you navigate the complex
                Saudi Arabian legal landscape and ensure your business success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[var(--sourcekom-blue)] hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">
                    Book Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-[var(--sourcekom-blue)]"
                  asChild
                >
                  <Link href="/legal/consultation">
                    Request Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
