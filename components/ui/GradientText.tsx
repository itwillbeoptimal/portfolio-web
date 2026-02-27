import React from 'react';

export const gradientStyle = (diag?: boolean): React.CSSProperties => ({
  background: diag ? 'var(--gradient-h)' : 'var(--gradient)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
});

export default function GradientText({
  children,
  diag,
  as,
  className,
  style,
}: {
  children: React.ReactNode;
  diag?: boolean;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Component = (as ?? 'span') as React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }>;

  return (
    <Component
      className={className}
      style={{ ...gradientStyle(diag), ...style }}
    >
      {children}
    </Component>
  );
}
