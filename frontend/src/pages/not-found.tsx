import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <PageWrapper className="bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 pt-20 pb-12">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-3">404</h1>
            <p className="text-muted-foreground mb-6">Page Not Found</p>
            <Link href="/">
              <Button className="rounded-full">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
