'use client';

import { useTrackClick } from '@/hooks/useTrackClick';
import { Button } from 'primereact/button';

interface ClickTrackedLinkProps {
  href: string;
  productSlug: string;
  productName: string;
  sourcePage: string;
  ctaPlacement?: string;
  label?: string;
  icon?: string;
  className?: string;
  size?: 'small' | 'large' | undefined;
}

export function ClickTrackedLink({
  href,
  productSlug,
  productName,
  sourcePage,
  ctaPlacement,
  label = 'Beli di Lynk.id',
  icon = 'pi pi-shopping-cart',
  className,
  size = 'large',
}: ClickTrackedLinkProps) {
  const { trackClick } = useTrackClick();

  const handleClick = () => {
    trackClick({
      productSlug,
      productName,
      destinationUrl: href,
      sourcePage,
      ctaPlacement,
    });

    // Open in new tab
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      label={label}
      icon={icon}
      size={size}
      className={className || 'font-bold shadow-md'}
      onClick={handleClick}
    />
  );
}
