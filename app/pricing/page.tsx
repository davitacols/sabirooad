import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center">Pricing Plans</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>For individual users and small projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$9.99/month</p>
            <ul className="mt-4 space-y-2">
              <li>100 image uploads per month</li>
              <li>Basic building classification</li>
              <li>Limited metadata access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Choose Basic</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For professionals and growing businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$29.99/month</p>
            <ul className="mt-4 space-y-2">
              <li>Unlimited image uploads</li>
              <li>Advanced building classification</li>
              <li>Full metadata access</li>
              <li>API access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Choose Pro</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large organizations and custom needs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">Custom Pricing</p>
            <ul className="mt-4 space-y-2">
              <li>All Pro features</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
              <li>On-premise deployment options</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

