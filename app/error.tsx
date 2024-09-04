"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Alert className="w-[50%]">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};

export default ErrorBoundary;
