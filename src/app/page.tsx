"use client";

import { useState, useEffect } from "react";
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
  Search,
  Download,
  Star,
  Users,
  Building,
  Truck,
  FileText,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  BarChart3,
  Handshake,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import SourcekomAgent from "@/components/agent/SourcekomAgent";
import AgentButton from "@/components/agent/AgentButton";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredResources, setFeaturedResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");

  const categoryIcons = {
    "Office Space": Building,
    Equipment: Truck,
    Personnel: Users,
    Storage: Building,
    Vehicles: Truck,
    "Legal Services": FileText,
  };

  useEffect(() => {
    fetchFeaturedResources();
    fetchCategories();
  }, []);

  const fetchFeaturedResources = async () => {
    try {
      const response = await fetch("/api/resources/featured");
      if (response.ok) {
        const data = await response.json();
        setFeaturedResources(data);
      }
    } catch (error) {
      console.error("Failed to fetch featured resources:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
          type: "resource_inquiry",
        }),
      });

      if (response.ok) {
        alert("Thank you for your inquiry! We will get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send inquiry. Please try again.");
      }
    } catch (error) {
      alert("Failed to send inquiry. Please try again.");
    }
  };

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          alert(
            "Thank you for subscribing! You will receive updates at: " + email,
          );
          setEmail("");
        } else {
          const data = await response.json();
          alert(data.error || "Subscription failed. Please try again.");
        }
      } catch (error) {
        alert("Subscription failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="SourceKom" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <Link
                href="/resources"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Resources
              </Link>
              <Link
                href="/legal"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Legal Services
              </Link>
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <div className="flex space-x-4 pt-4 border-t">
                <Button variant="ghost" asChild className="flex-1">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white flex-1"
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--sourcekom-blue-light)]/10 via-white to-[var(--sourcekom-yellow)]/10">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
            Welcome to the Future of Resource Management
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] bg-clip-text text-transparent">
            Revolutionizing Resource Management in Saudi Arabia
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SourceKom connects businesses to maximize potential and foster
            sustainable growth through resource optimization in logistics and
            supply chain management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
              asChild
            >
              <Link href="/register">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--sourcekom-blue)] mb-2">
                500+
              </div>
              <div className="text-muted-foreground">Trusted Businesses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--sourcekom-blue)] mb-2">
                30%
              </div>
              <div className="text-muted-foreground">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--sourcekom-blue)] mb-2">
                100%
              </div>
              <div className="text-muted-foreground">Secure Platform</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--sourcekom-blue)] mb-2">
                24/7
              </div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Overview */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Resource Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[var(--sourcekom-blue)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-[var(--sourcekom-blue)]" />
                </div>
                <CardTitle className="text-2xl font-bold text-[var(--sourcekom-blue)]">
                  247
                </CardTitle>
                <CardDescription>Active Resources</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-[var(--sourcekom-yellow)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-[var(--sourcekom-yellow-dark)]" />
                </div>
                <CardTitle className="text-2xl font-bold text-[var(--sourcekom-yellow-dark)]">
                  89
                </CardTitle>
                <CardDescription>Active Bookings</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-purple-600">
                  SAR 458K
                </CardTitle>
                <CardDescription>Total Revenue</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-orange-600">
                  78%
                </CardTitle>
                <CardDescription>Utilization Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
                About SourceKom
              </Badge>
              <h2 className="text-3xl font-bold mb-6">
                Adding strength to businesses, businesses to strengths
              </h2>
              <p className="text-muted-foreground mb-6">
                SourceKom is an innovative resource sharing and legal
                consultancy platform operating in Saudi Arabia. The name
                "SourceKom" combines the English word "source" with "Kom," which
                means "Yours" in Arabic, expressing the company's concept of
                being the ideal resource partner clients can count on.
              </p>
              <p className="text-muted-foreground mb-8">
                Founded by Abdullah Mirza, a motivated entrepreneur with over a
                decade of experience in business development, SourceKom is
                transforming the Saudi Arabian market by enabling businesses to
                exchange underutilized resources and providing expert legal
                consultancy, fostering a new era of efficiency and
                sustainability.
              </p>
              <Button
                className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
                asChild
              >
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6">
                <Target className="w-8 h-8 text-[var(--sourcekom-blue)] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground">
                  Revolutionizing the Saudi market through resource optimization
                  and legal expertise
                </p>
              </Card>
              <Card className="text-center p-6">
                <Lightbulb className="w-8 h-8 text-[var(--sourcekom-yellow-dark)] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering businesses with strength and connectivity for
                  sustainable growth
                </p>
              </Card>
              <Card className="text-center p-6">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Legal Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive legal guidance for Saudi market operations
                </p>
              </Card>
              <Card className="text-center p-6">
                <Zap className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Resource Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Optimize resource utilization across businesses
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
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
                <Truck className="w-8 h-8 text-[var(--sourcekom-blue)] mb-4" />
                <CardTitle>Logistics and Supply Chain Management</CardTitle>
                <CardDescription>
                  Comprehensive solutions for optimizing your logistics
                  operations and supply chain processes to improve efficiency
                  and reduce costs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/logistics">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Building className="w-8 h-8 text-[var(--sourcekom-yellow-dark)] mb-4" />
                <CardTitle>Resource Optimization and Exchange</CardTitle>
                <CardDescription>
                  Innovative platform for businesses to exchange underutilized
                  resources, creating new value and reducing waste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/resource-optimization">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
                <CardTitle>Strategic Business Consulting</CardTitle>
                <CardDescription>
                  Expert guidance on business strategy, market positioning, and
                  growth opportunities tailored to the Saudi Arabian market.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/consulting">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-orange-600 mb-4" />
                <CardTitle>Operational Efficiency Improvement</CardTitle>
                <CardDescription>
                  Analysis and enhancement of business operations to maximize
                  productivity and minimize resource waste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/efficiency">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <CardTitle>Sustainable Business Practices</CardTitle>
                <CardDescription>
                  Implementation of environmentally friendly and socially
                  responsible business practices that also improve
                  profitability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/sustainability">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-8 h-8 text-red-600 mb-4" />
                <CardTitle>Market Entry and Expansion Services</CardTitle>
                <CardDescription>
                  Support for businesses looking to enter or expand within the
                  Saudi Arabian market, leveraging our local knowledge and
                  connections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/services/market-entry">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process ensures optimal resource matching and
              legal compliance for your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--sourcekom-blue)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[var(--sourcekom-blue)]">
                  1
                </span>
              </div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-sm text-muted-foreground">
                We begin by thoroughly analyzing your resource needs and legal
                requirements to identify optimization opportunities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--sourcekom-yellow)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[var(--sourcekom-yellow-dark)]">
                  2
                </span>
              </div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-sm text-muted-foreground">
                We connect you with the right resources or provide the necessary
                legal guidance to address your specific needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Implement</h3>
              <p className="text-sm text-muted-foreground">
                Our team works alongside yours to implement resource sharing
                solutions or legal strategies with minimal disruption.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Optimize</h3>
              <p className="text-sm text-muted-foreground">
                We continuously monitor and refine our solutions to ensure
                optimal performance and compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
                Resource Platform
              </Badge>
              <h2 className="text-3xl font-bold">Available Resources</h2>
              <p className="text-muted-foreground">
                Browse our curated selection of business resources
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/resources">View All Resources</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource: any) => (
              <Link key={resource.id} href={`/resources/${resource.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    {resource.thumbnail ? (
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg line-clamp-2">
                        {resource.title}
                      </CardTitle>
                      <Badge
                        variant={resource.isFree ? "secondary" : "default"}
                      >
                        {resource.isFree ? "Free" : `SAR ${resource.price}`}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{resource.averageRating || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{resource.downloadCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join us in revolutionizing business in Saudi Arabia
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with SourceKom today to explore how we can help your
            business thrive through resource sharing and legal expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">
                Contact Us
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
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
                Contact Information
              </Badge>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Ready to optimize your resources? Reach out to our team for
                expert guidance and support.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--sourcekom-blue)]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[var(--sourcekom-blue)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@sourcekom.com</p>
                    <p className="text-sm text-muted-foreground">
                      For general inquiries and support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--sourcekom-yellow)]/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[var(--sourcekom-yellow-dark)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+966 123 456 7890</p>
                    <p className="text-sm text-muted-foreground">
                      Monday to Friday, 9AM-5PM
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">King Fahd Road</p>
                    <p className="text-muted-foreground">
                      Riyadh, Saudi Arabia
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Book an appointment before visiting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resource Sharing Inquiry</CardTitle>
                <CardDescription>
                  Tell us about your resource needs and we'll help you find the
                  perfect solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactForm} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name *</label>
                      <Input name="name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <Input name="company" placeholder="Your Company Ltd." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Describe the resources you want to share or access *
                    </label>
                    <textarea
                      name="message"
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={4}
                      placeholder="Please provide details about what resources you're looking to share or access through our platform."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
                  >
                    Submit Resource Inquiry
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-[var(--sourcekom-blue)]/10 text-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue)]/20 border-[var(--sourcekom-blue)]/20">
            Stay Updated
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest updates on resource sharing opportunities and legal
            consultancy services delivered to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubscribe}
            className="max-w-md mx-auto flex gap-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-[var(--sourcekom-blue)] hover:bg-[var(--sourcekom-blue-light)] text-white"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="SourceKom" className="h-8 w-auto" />
              </div>
              <p className="text-muted-foreground">
                Revolutionizing resource management in Saudi Arabia through our
                innovative sharing platform and expert legal consultancy
                services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resource Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/resources" className="hover:text-foreground">
                    Browse Resources
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="hover:text-foreground">
                    List Your Resource
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-foreground">
                    Analytics Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/legal/corporate"
                    className="hover:text-foreground"
                  >
                    Corporate Law
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/contracts"
                    className="hover:text-foreground"
                  >
                    Contract Review
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/compliance"
                    className="hover:text-foreground"
                  >
                    Compliance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/consultation"
                    className="hover:text-foreground"
                  >
                    Legal Consultation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>King Fahd Road, Riyadh</li>
                <li>Saudi Arabia 11564</li>
                <li>info@sourcekom.com</li>
                <li>+966 123 456 7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2025 SourceKom. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AgentButton />
    </div>
  );
}
