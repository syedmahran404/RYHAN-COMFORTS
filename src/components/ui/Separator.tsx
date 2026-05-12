import { cn } from '@/lib/utils/cn';

export function Separator({
  className,
  label
}: {
  className?: string;
  label?: string;
}) {
  if (label) {
    return (
      <div className={cn('divider-ornament', className)}>
        <span>{label}</span>
      </div>
    );
  }
  return <div className={cn('hairline', className)} aria-hidden />;
}
