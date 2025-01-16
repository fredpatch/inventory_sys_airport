import LoginForm from "@/components/shared/auth/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-secondary p-5 h-full">
      {/* <Card className=""> */}
      <div className="grid shadow-none lg:grid-cols-2 p-5 mt-10">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd />
              </div>
              Prestigieux Inc.
            </a>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>

        <div className="relative hidden bg-muted lg:block">
          <img
            src="/placeholder.svg"
            alt="image"
            className="absolute inset-0 h-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default LoginPage;
