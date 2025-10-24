"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building,
  FileText,
  Calendar,
  CheckCircle,
  Send,
  MessageCircle,
  User,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("resource-inquiry");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    serviceType: "",
    message: "",
    preferredContact: "",
    urgent: false,
    newsletter: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        setError("Please fill in all required fields");
        return;
      }

      // Mock successful submission
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        serviceType: "",
        message: "",
        preferredContact: "",
        urgent: false,
        newsletter: false,
      });

      console.log("Form submitted:", formData);
    } catch (error) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
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
            <Link
              href="/legal"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Legal Services
            </Link>
            <Link href="/contact" className="text-foreground font-semibold">
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
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Join us in revolutionizing business in Saudi Arabia. Connect with
            SourceKom today to explore how we can help your business thrive
            through resource sharing and legal expertise.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-[var(--sourcekom-blue)]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[var(--sourcekom-blue)]" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">info@sourcekom.com</p>
                  <p className="text-sm text-muted-foreground">
                    For general inquiries and support
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Response within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-[var(--sourcekom-yellow)]/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[var(--sourcekom-yellow-dark)]" />
                  </div>
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">+966 123 456 7890</p>
                  <p className="text-sm text-muted-foreground">
                    Monday to Friday, 9AM-5PM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sat-Thu: Business hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-1">King Fahd Road</p>
                  <p className="text-muted-foreground">
                    Riyadh, Saudi Arabia 11564
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Book an appointment before visiting
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Thursday</span>
                      <span className="font-medium">9AM - 6PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday</span>
                      <span className="font-medium">9AM - 12PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="resource-inquiry">
                      Resource Sharing Inquiry
                    </TabsTrigger>
                    <TabsTrigger value="legal-consultation">
                      Legal Consultation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="resource-inquiry" className="mt-6">
                    <div>
                      <CardTitle>Resource Sharing Inquiry</CardTitle>
                      <CardDescription>
                        Tell us about your resource needs and we'll help you
                        find the perfect solution
                      </CardDescription>
                    </div>
                  </TabsContent>

                  <TabsContent value="legal-consultation" className="mt-6">
                    <div>
                      <CardTitle>Legal Consultation Booking</CardTitle>
                      <CardDescription>
                        Schedule a consultation with our legal experts for
                        comprehensive guidance
                      </CardDescription>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your message has been sent successfully. We'll get back to
                      you within 24 hours.
                    </p>
                    <Button onClick={() => setSuccess(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="company"
                          className="flex items-center gap-2"
                        >
                          <Briefcase className="w-4 h-4" />
                          Company Name
                        </Label>
                        <Input
                          id="company"
                          placeholder="Your Company Ltd."
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+966 123 456 7890"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {activeTab === "resource-inquiry" && (
                      <div className="space-y-2">
                        <Label htmlFor="service-type">Resource Type *</Label>
                        <Select
                          value={formData.serviceType}
                          onValueChange={(value) =>
                            handleInputChange("serviceType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select resource type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office-space">
                              Office Space
                            </SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="vehicles">Vehicles</SelectItem>
                            <SelectItem value="storage">Storage</SelectItem>
                            <SelectItem value="personnel">
                              Personnel/Staff
                            </SelectItem>
                            <SelectItem value="software">
                              Software/Technology
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {activeTab === "legal-consultation" && (
                      <div className="space-y-2">
                        <Label htmlFor="consultation-type">
                          Legal Service Type *
                        </Label>
                        <Select
                          value={formData.serviceType}
                          onValueChange={(value) =>
                            handleInputChange("serviceType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select legal service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corporate">
                              Corporate Law
                            </SelectItem>
                            <SelectItem value="contracts">
                              Contract Review
                            </SelectItem>
                            <SelectItem value="compliance">
                              Compliance
                            </SelectItem>
                            <SelectItem value="licensing">
                              Business Licensing
                            </SelectItem>
                            <SelectItem value="employment">
                              Employment Law
                            </SelectItem>
                            <SelectItem value="litigation">
                              Legal Litigation
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        {activeTab === "resource-inquiry"
                          ? "Describe the resources you want to share or access *"
                          : "Describe your legal needs and requirements *"}
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder={
                          activeTab === "resource-inquiry"
                            ? "Please provide details about what resources you're looking to share or access through our platform. Include quantity, location, timeframe, and any specific requirements."
                            : "Please describe your legal requirements, concerns, or the specific legal services you need assistance with."
                        }
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-preference">
                        Preferred Contact Method
                      </Label>
                      <Select
                        value={formData.preferredContact}
                        onValueChange={(value) =>
                          handleInputChange("preferredContact", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="How would you like to be contacted?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="in-person">
                            In-Person Meeting
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked) =>
                          handleInputChange("urgent", checked as boolean)
                        }
                      />
                      <Label htmlFor="urgent">
                        This is urgent and requires immediate attention
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) =>
                          handleInputChange("newsletter", checked as boolean)
                        }
                      />
                      <Label htmlFor="newsletter">
                        I'd like to receive updates on resource sharing
                        opportunities and legal services
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-[var(--sourcekom-blue)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-[var(--sourcekom-blue)]" />
              </div>
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get instant help through our live chat support
              </CardDescription>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Book Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Schedule a one-on-one consultation with our experts
              </CardDescription>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/calendar">Schedule Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-[var(--sourcekom-yellow)]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-[var(--sourcekom-yellow-dark)]" />
              </div>
              <CardTitle>Download Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access free resources and guides for your business
              </CardDescription>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <Card className="bg-gradient-to-r from-[var(--sourcekom-blue)] to-[var(--sourcekom-yellow)] text-white">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg mb-8 opacity-90">
                Subscribe to our newsletter for the latest updates on resource
                sharing opportunities and legal consultancy services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  required
                />
                <Button className="bg-white text-[var(--sourcekom-blue)] hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
