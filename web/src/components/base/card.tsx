import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cn } from "@/lib/utils";

const cardStyles = tv({
  slots: {
    base: "bg-white rounded-xl border border-slate-200 shadow-sm",
    header: "p-4 pb-0",
    content: "p-4",
    footer: "p-4 pt-0",
  },
  variants: {
    size: {
      default: {},
      sm: {},
    },
  },
});

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    const s = cardStyles();

    return (
      <div ref={ref} className={cn(s.base(), className)} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const s = cardStyles();

    return (
      <div ref={ref} className={cn(s.header(), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    const s = cardStyles();

    return (
      <div ref={ref} className={cn(s.content(), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

interface CardFooterProps {
  className?: string;
  children?: React.ReactNode;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    const s = cardStyles();

    return (
      <div ref={ref} className={cn(s.footer(), className)} {...props}>
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";

export type { CardContentProps, CardFooterProps, CardHeaderProps, CardProps };
export { Card, CardContent, CardFooter, CardHeader };
