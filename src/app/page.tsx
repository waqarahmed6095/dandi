import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import AuthActions from "@/components/AuthActions"
import {
  Github,
  Star,
  GitPullRequest,
  Brain,
  CheckCircle,
  Sparkles,
  Tag,
  Users,
  Code,
  Shield,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { ApiDemo } from "./ApiDemo"

export default async function DandiGitHubAnalyzerLanding() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-wrap h-auto min-h-16 items-center justify-between px-2 sm:px-4">
          <div className="mr-4 flex flex-wrap items-center w-full sm:w-auto justify-between">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Github className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">Dandi</span>
            </Link>
            <nav className="flex flex-wrap items-center space-x-4 sm:space-x-6 text-sm font-medium mt-2 sm:mt-0">
              <Link href="#features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="#pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2 mt-2 sm:mt-0">
            <div className="flex items-center space-x-2">
              {session ? (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <span className="text-xs sm:text-sm">
                    Welcome, {session.user?.name || session.user?.email}
                  </span>
                  <AuthActions />
                </div>
              ) : (
                <>
                  <Link href="/api/auth/signin">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/api/auth/signin">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-32 px-2 sm:px-4">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Repository Insights
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
              Discover the Story Behind{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Every Repository
              </span>
            </h1>
            <p className="max-w-[90vw] sm:max-w-[750px] text-base sm:text-lg text-muted-foreground sm:text-xl">
              Get comprehensive insights, cool facts, star analytics, important pull requests, and version updates for
              any open source GitHub repository. All in one beautiful dashboard.
            </p>
          </div>
        </section>
              
        {/* Features Section */}
        <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24 px-2 sm:px-4">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              Everything You Need to Know
            </h2>
            <p className="max-w-[90vw] sm:max-w-[700px] text-base sm:text-lg text-muted-foreground">
              Get deep insights into any open source repository with our comprehensive analysis tools
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-6 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-5">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Smart Summary</CardTitle>
                <CardDescription className="text-sm">
                  AI-generated summaries of repository purpose, architecture, and key features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Project overview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Tech stack analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Key insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg mb-2">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Star Analytics</CardTitle>
                <CardDescription className="text-sm">
                  Track star growth, popularity trends, and community engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Growth charts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Trend analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Popularity ranking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-2">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Cool Facts</CardTitle>
                <CardDescription className="text-sm">
                  Discover interesting statistics and fun facts about the repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Unique insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Hidden gems</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Fun statistics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-2">
                  <GitPullRequest className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Important PRs</CardTitle>
                <CardDescription className="text-sm">
                  Latest significant pull requests and their impact on the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Critical changes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Impact analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Recent updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mb-2">
                  <Tag className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Version Updates</CardTitle>
                <CardDescription className="text-sm">
                  Track releases, version history, and update patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Release timeline</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Version analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">Update frequency</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* API Demo Section */}
        <section id="api-demo" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Try Our API</h2>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Experience the power of our GitHub analysis API with this interactive demo
            </p>
          </div>

          <ApiDemo />
        </section>
      

        {/* Pricing Section */}
        <section id="pricing" className="container space-y-6 py-8 md:py-12 lg:py-24 px-2 sm:px-4">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[90vw] sm:max-w-[700px] text-base sm:text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-6 grid-cols-1 sm:grid-cols-1 md:max-w-[64rem] md:grid-cols-3">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Free
                  <Badge variant="secondary">Popular</Badge>
                </CardTitle>
                <CardDescription>Perfect for exploring repositories</CardDescription>
                <div className="text-4xl font-bold">
                  $0<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">5 repository analyses/month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">All core insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Basic dashboard</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Community support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-blue-200 dark:border-blue-800 shadow-lg">
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">Coming Soon</Badge>

              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For serious developers and teams</CardDescription>
                <div className="text-4xl font-bold">
                  $19<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">100 repository analyses/month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Advanced insights & trends</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom dashboards</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Export reports (PDF/CSV)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">API access</span>
                  </li>
                </ul>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">Coming Soon</Badge>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For organizations and large teams</CardDescription>
                <div className="text-4xl font-bold">
                  $99<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Unlimited analyses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Private repository access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Team collaboration tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Advanced API & webhooks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container space-y-6 py-8 md:py-12 lg:py-24 bg-muted/50 px-2 sm:px-4">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Why Developers Choose Dandi
            </h2>
          </div>

          <div className="mx-auto grid justify-center gap-6 grid-cols-1 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
            <Card className="text-center border-none shadow-none bg-transparent">
              <CardHeader>
                <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive repository insights in seconds instead of hours of manual research
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-none bg-transparent">
              <CardHeader>
                <Users className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">Make Better Decisions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Choose the right libraries and tools based on comprehensive analysis and trends
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-none bg-transparent">
              <CardHeader>
                <Code className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track important changes, releases, and pull requests across your favorite projects
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-none bg-transparent">
              <CardHeader>
                <Shield className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-lg">Trusted Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Reliable insights powered by AI and real-time GitHub data analysis
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

      
        
      </main>

      {/* Footer */}
      <footer className="border-t bg-background px-2 sm:px-4">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Github className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">Dandi</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Discover the story behind every GitHub repository with AI-powered insights.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <div className="space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Features
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Pricing
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  API
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Documentation
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  About
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Blog
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Careers
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Contact
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Help Center
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Terms of Service
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground block">
                  Status
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 Dandi GitHub Analyzer. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Twitter
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
