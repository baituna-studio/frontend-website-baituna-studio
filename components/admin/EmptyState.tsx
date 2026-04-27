'use client';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon && (
        <div className="mb-4">
          <i className={`${icon} text-5xl text-text-color-secondary opacity-20`}></i>
        </div>
      )}
      <h3 className="text-xl font-medium text-text-color">{title}</h3>
      {description && (
        <p className="mt-2 text-text-color-secondary max-w-xs mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
