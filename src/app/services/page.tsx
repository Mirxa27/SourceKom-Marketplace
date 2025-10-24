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
  Truck,
  Building,
  TrendingUp,
  BarChart3,
  Shield,
  FileText,
  Target,
  Lightbulb,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState("all");

  const services = [
    {
      id: "logistics",
      title: "Logistics and Supply Chain Management",
      description:
        "Comprehensive solutions for optimizing your logistics operations and supply chain processes to improve efficiency and reduce costs.",
      icon: Truck,
      color: "blue",
      duration: "3-6 months",
      rating: 4.9,
      reviews: 156,
      features: [
        "Supply chain optimization",
        "Logistics cost reduction",
        "Inventory management",
        "Transportation planning",
        "Warehouse optimization",
        "Real-time tracking",
      ],
      benefits: [
        "30% cost reduction",
        "Improved delivery times",
        "Enhanced inventory accuracy",
        "Better supplier relationships",
      ],
      idealFor: [
        "Manufacturing companies",
        "Distribution centers",
        "E-commerce businesses",
        "Retail chains",
      ],
    },
    {
      id: "resource-optimization",
      title: "Resource Optimization and Exchange",
      description:
        "Innovative platform for businesses to exchange underutilized resources, creating new value and reducing waste.",
      icon: Building,
      color: "yellow",
      duration: "Ongoing service",
      rating: 4.8,
      reviews: 203,
      features: [
        "Resource sharing marketplace",
        "Resource matching algorithms",
        "Cost optimization",
        "Waste reduction",
        "Network building",
        "Analytics dashboard",
      ],
      benefits: [
        "Up to 40% cost savings",
        "Environmental sustainability",
        "Business network expansion",
        "Resource utilization optimization",
      ],
      idealFor: [
        "Companies with underutilized assets",
        "Businesses looking to reduce costs",
        "Organizations focused on sustainability",
        "Network-hungry enterprises",
      ],
    },
    {
      id: "consulting",
      title: "Strategic Business Consulting",
      description:
        "Expert guidance on business strategy, market positioning, and growth opportunities tailored to the Saudi Arabian market.",
      icon: TrendingUp,
      color: "purple",
      duration: "1-3 months",
      rating: 4.7,
      reviews: 89,
      features: [
        "Market analysis",
        "Competitive intelligence",
        "Growth strategy development",
        "Market entry planning",
        "Business model optimization",
        "Performance benchmarking",
      ],
      benefits: [
        "Data-driven insights",
        "Competitive advantage",
        "Strategic clarity",
        "Market leadership",
      ],
      idealFor: [
        "Startups and SMEs",
        "Companies expanding in KSA",
        "Businesses seeking growth",
        "Market entrants",
      ],
    },
    {
      id: "efficiency",
      title: "Operational Efficiency Improvement",
      description:
        "Analysis and enhancement of business operations to maximize productivity and minimize resource waste.",
      icon: BarChart3,
      color: "orange",
      duration: "2-4 months",
      rating: 4.6,
      reviews: 67,
      features: [
        "Process optimization",
        "Performance analysis",
        "Waste identification",
        "Efficiency improvements",
        "Automation assessment",
        "Continuous improvement",
      ],
      benefits: [
        "25-50% productivity increase",
        "Reduced operational costs",
        "Improved quality",
        "Faster turnaround times",
      ],
      idealFor: [
        "Manufacturing operations",
        "Service providers",
        "Administrative departments",
        "Production facilities",
      ],
    },
    {
      id: "sustainability",
      title: "Sustainable Business Practices",
      description:
        "Implementation of environmentally friendly and socially responsible business practices that also improve profitability.",
      icon: Shield,
      color: "green",
      duration: "6-12 months",
      rating: 4.8,
      reviews: 45,
      features: [
        "Sustainability assessment",
        "Green strategy development",
        "Environmental impact analysis",
        "ESG compliance",
        "Circular economy solutions",
        "Sustainability reporting",
      ],
      benefits: [
        "Reduced environmental footprint",
        "Improved brand reputation",
        "Cost savings through efficiency",
        "Regulatory compliance",
      ],
      idealFor: [
        "Manufacturing companies",
        "Construction firms",
        "Retail businesses",
        "Technology companies",
      ],
    },
    {
      id: "market-entry",
      title: "Market Entry and Expansion Services",
      description:
        "Support for businesses looking to enter or expand within the Saudi Arabian market, leveraging our local knowledge and connections.",
      icon: Globe,
      color: "red",
      duration: "3-12 months",
      rating: 4.9,
      reviews: 78,
      features: [
        "Market research",
        "Regulatory compliance",
        "Business setup assistance",
        "Local partnership building",
        "Cultural adaptation",
        "Ongoing support",
      ],
      benefits: [
        "Smooth market entry",
        "Reduced regulatory hurdles",
        "Local network access",
        "Cultural intelligence",
      ],
      idealFor: [
        "International companies",
        "New market entrants",
        "Expanding businesses",
        "Investors",
      ],
    },
  ];

  const filteredServices =
    selectedService === "all"
      ? services
      : services.filter((service) => service.id === selectedService);

  const selectedServiceData = services.find(
    (service) => service.id === selectedService,
  );

  const ServiceCard = ({ service }: { service: any }) => {
    const Icon = service.icon;
    const colorClasses = {
      blue: "text-blue-600",
      yellow: "text-[var(--sourcekom-yellow-dark)]",
      purple: "text-purple-600",
      orange: "text-orange-600",
      green: "text-green-600",
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
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="space-y-1">
                {service.features
                  .slice(0, 3)
                  .map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-muted-foreground">
                    +{service.features.length - 3} more features...
                  </li>
                )}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <Link href={`/services/${service.id}`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Star className="w-4 h-4" />
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
                      Detailed information about this service
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
                        <h4 className="font-semibold mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {service.features.map(
                            (feature: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
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
                                <Award className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{benefit}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Ideal For</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.idealFor.map(
                          (target: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {target}
                            </Badge>
                          ),
                        )}
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
                          {service.duration}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="flex-1" asChild>
                        <Link href={`/services/${service.id}`}>
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/contact">Request Quote</Link>
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
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
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
            <Link href="/services" className="text-foreground font-semibold">
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
        {/* Page Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge className="mb-6 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
              Our Services
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Comprehensive Solutions</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              SourceKom offers comprehensive solutions to optimize your
              resources and enhance your business performance across Saudi
              Arabia.
            </p>
          </div>

          {/* Service Categories */}
          <Tabs
            value={selectedService}
            onValueChange={setSelectedService}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="resource-optimization">Resources</TabsTrigger>
              <TabsTrigger value="consulting">Consulting</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="market-entry">Market Entry</TabsTrigger>
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
                        <Link href={`/services/${selectedServiceData.id}`}>
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
                      <div className="text-3xl font-bold mb-2">100%</div>
                      <div className="text-sm opacity-90">Satisfaction</div>
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
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of businesses already benefiting from SourceKom's
                comprehensive solutions and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[var(--sourcekom-blue)] hover:bg-gray-100"
                  asChild
                >
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
                  <Link href="/about">
                    Learn More About Us
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
