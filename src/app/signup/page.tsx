import Link from "next/link";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Signup = () => {
  return (
    <Background>
      <section className="py-12 lg:pt-20 lg:pb-16">
        <div className="container">
          <div className="flex flex-col gap-4">
            <div className="mx-auto w-full max-w-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                ← Back to home
              </Link>
            </div>
            <Card className="mx-auto w-full max-w-sm">
              <CardHeader className="flex flex-col items-center space-y-0">
                <div className="mb-7 text-xl font-bold tracking-tight">
                  Pepon<span className="text-primary">Mail</span>
                </div>
                <p className="mb-2 text-2xl font-bold">Create your account</p>
                <p className="text-muted-foreground">
                  Get started with PeponMail
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Input type="text" placeholder="John Doe" required />
                  <Input type="email" placeholder="you@example.com" required />
                  <div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                    <p className="text-muted-foreground mt-1 text-sm">
                      Must be at least 8 characters.
                    </p>
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    Create Account
                  </Button>
                </div>
                <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                  <p>Already have an account?</p>
                  <Link href="/login" className="text-primary font-medium">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Background>
  );
};

export default Signup;
