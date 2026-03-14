"use client";

import Link from "next/link";

import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { haptics } from "@/lib/haptics";

const Login = () => {
  return (
    <Background>
      <section className="py-12 lg:pt-20 lg:pb-16">
        <div className="container">
          <div className="flex flex-col gap-4">
            <div className="mx-auto w-full max-w-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-sm transition-colors"
                onClick={() => haptics.trigger()}
              >
                ← Back to home
              </Link>
            </div>
            <Card className="mx-auto w-full max-w-sm">
              <CardHeader className="flex flex-col items-center space-y-0">
                <div className="mb-7 text-xl font-bold tracking-tight">
                  Pepon<span className="text-primary">Mail</span>
                </div>
                <p className="mb-2 text-2xl font-bold">Welcome back</p>
                <p className="text-muted-foreground">Sign in to your account</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                  <div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="border-muted-foreground"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-primary text-sm font-medium" onClick={() => haptics.trigger()}>
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    Sign In
                  </Button>
                </div>
                <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                  <p>Don&apos;t have an account?</p>
                  <Link href="/signup" className="text-primary font-medium" onClick={() => haptics.trigger()}>
                    Sign up
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

export default Login;
