"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslations } from "next-intl";

const ErrorBoundary = ({ error }: { error: Error }) => {
  const t = useTranslations("System");
  return (
    <Alert className="w-[50%]">
      <AlertTitle>{t("error")}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};

export default ErrorBoundary;
