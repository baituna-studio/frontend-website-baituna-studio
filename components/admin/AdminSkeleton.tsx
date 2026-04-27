'use client';

interface AdminSkeletonProps {
  className?: string;
}

export default function AdminSkeleton({ className }: AdminSkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className || ''}`}></div>
  );
}
