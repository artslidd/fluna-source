import React from "react";

const baseStyles =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

const variantStyles = {
  neutral:
    "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
  done: "border-transparent bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900 dark:text-green-50 dark:hover:bg-green-900/80",
  danger:
    "border-transparent bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/80",
  notice:
    "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900 dark:text-yellow-50 dark:hover:bg-yellow-900/80",
  "in-review":
    "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900 dark:text-blue-50 dark:hover:bg-blue-900/80",
};

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  const combinedClassName = [baseStyles, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export { Badge };
