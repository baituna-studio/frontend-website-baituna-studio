'use client';

import AdminSkeleton from './AdminSkeleton';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: string;
  accentGradient: string;
  loading?: boolean;
}

export default function MetricCard({
  label,
  value,
  icon,
  accentGradient,
  loading = false
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-section overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Accent Bar */}
      <div 
        className="h-1 w-full" 
        style={{ background: accentGradient }}
      ></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-text-color-secondary font-medium text-sm mb-1">{label}</p>
            {loading ? (
              <AdminSkeleton className="h-9 w-16 my-1" />
            ) : (
              <h3 className="text-3xl font-bold text-text-color">{value}</h3>
            )}
          </div>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ 
              background: `${accentGradient.replace('linear-gradient', 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), linear-gradient')}`
            }}
          >
            <i className={`pi ${icon} text-xl`} style={{ 
              background: accentGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
