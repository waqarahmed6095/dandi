"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, Play, FileText, Copy, Check } from "lucide-react"

export function ApiDemo() {
  const [repository, setRepository] = useState("waqarahmed6695/gpt-marketer")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("response")

  // Default example response
  const defaultResponse = {
    summary:
      "# GPT-Marketer\n\nGPT-Marketer is a specialized AI tool designed to help users create comprehensive marketing campaigns using OpenAI's GPT models. This repository provides a framework for generating marketing content, strategies, and analytics through an AI-powered interface.\n\n## Key Features\n- **Marketing Strategy Generation**: Creates tailored marketing strategies based on user inputs\n- **Content Creation**: Generates various forms of marketing content including social media posts, email campaigns, and ad copy\n- **Analytics Integration**: Provides suggestions for tracking and analyzing marketing performance\n- **Customizable Templates**: Templates for different marketing needs and industries\n\n## Technologies\n- Python\n- OpenAI API\n- Flask web framework\n- HTML/CSS/JavaScript frontend\n\nThe repository is structured to provide a complete solution for marketers looking to leverage AI in their workflow, with an emphasis on practical implementation and ease of use.",
    coolfacts: [
      "The repository combines AI capabilities with traditional marketing principles to create a hybrid approach to campaign development",
      "It uses prompt engineering techniques to optimize the quality and relevance of AI-generated marketing content",
      "The system can adapt its marketing suggestions based on different target demographics and market segments",
      "Users can generate entire marketing campaigns with minimal input, significantly reducing the time traditionally required for campaign planning",
      "The repository includes specialized modules for different marketing channels (social, email, content marketing) with tailored AI approaches for each",
    ],
    repository: "https://github.com/waqarahmed6695/gpt-marketer",
  }

  const [response, setResponse] = useState(defaultResponse)
  const [requestPayload, setRequestPayload] = useState(
    JSON.stringify({ repository: "waqarahmed6695/gpt-marketer" }, null, 2),
  )

  const handleSendRequest = () => {
    setIsLoading(true)
    setActiveTab("response")

    // Simulate API request
    setTimeout(() => {
      try {
        const payload = JSON.parse(requestPayload)
        // In a real implementation, this would be a fetch call to your API
        // For demo purposes, we're just returning the same response with the repository updated
        setResponse({
          ...defaultResponse,
          repository: `https://github.com/${payload.repository || repository}`,
        })
        setIsLoading(false)
      } catch (error) {
        console.error("Invalid JSON:", error)
        setIsLoading(false)
      }
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">API Demo</CardTitle>
            <CardDescription>Try out the Dandi GitHub Analyzer API</CardDescription>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            View Documentation
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Request</h3>
              <Badge variant="outline">POST /api/analyze</Badge>
            </div>
            <div className="relative">
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => copyToClipboard(requestPayload)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <textarea
                className="w-full h-[300px] font-mono text-sm p-4 bg-slate-950 text-green-400 rounded-md"
                value={requestPayload}
                onChange={(e) => setRequestPayload(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Repository (e.g., facebook/react)"
                  value={repository}
                  onChange={(e) => setRepository(e.target.value)}
                  className="w-64"
                />
              </div>
              <Button onClick={handleSendRequest} disabled={isLoading} className="flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Response</h3>
              <Badge variant="outline" className={isLoading ? "bg-yellow-500/20" : "bg-green-500/20"}>
                {isLoading ? "Loading..." : "200 OK"}
              </Badge>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="response" className="relative">
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="w-full h-[300px] overflow-auto font-mono text-sm p-4 bg-slate-950 text-green-400 rounded-md">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </TabsContent>
              <TabsContent value="preview">
                <div className="w-full h-[300px] overflow-auto p-4 bg-slate-950 text-green-400 rounded-md">
                  <h2 className="text-lg font-bold mb-2">Repository Analysis</h2>
                  <p className="mb-4 text-sm">{response.summary.split("\n\n")[0]}</p>

                  <h3 className="text-md font-bold mb-2">Cool Facts</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {response.coolfacts.map((fact, index) => (
                      <li key={index} className="text-sm">
                        {fact}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <a
                      href={response.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {response.repository}
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This is a demo of the API. In production, you would need an API key to make requests.
      </CardFooter>
    </Card>
  )
} 