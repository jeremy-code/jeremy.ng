import type { ComponentPropsWithRef } from "react";

import {
  Info,
  Lightbulb,
  MessageSquareWarning,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";

import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertTitle,
} from "@jeremyng/ui/components/Alert";

type AlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const isAlertType = (value: unknown): value is AlertType => {
  return (
    typeof value === "string" &&
    (value === "NOTE" ||
      value === "TIP" ||
      value === "IMPORTANT" ||
      value === "WARNING" ||
      value === "CAUTION")
  );
};

type MarkdownAlertProps = {
  type: AlertType;
} & ComponentPropsWithRef<"blockquote">;

const MARKDOWN_ALERT_MAP = {
  NOTE: {
    icon: <Info />,
    title: "Note",
    color: "blue",
  },
  TIP: {
    icon: <Lightbulb />,
    title: "Tip",
    color: "green",
  },
  IMPORTANT: {
    icon: <MessageSquareWarning />,
    title: "Important",
    color: "purple",
  },
  WARNING: {
    icon: <TriangleAlert />,
    title: "Warning",
    color: "yellow",
  },
  CAUTION: {
    icon: <OctagonAlert />,
    title: "Caution",
    color: "red",
  },
} as const;

const MarkdownAlert = ({ type, children }: MarkdownAlertProps) => {
  const { icon, title, color } = MARKDOWN_ALERT_MAP[type];

  return (
    <Alert color={color}>
      <AlertIcon>{icon}</AlertIcon>
      <AlertContent>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </AlertContent>
    </Alert>
  );
};

export { isAlertType, MarkdownAlert, type AlertType };
