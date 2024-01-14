"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.companyId}`,
      label: 'Overview',
      active: pathname === `/${params.companyId}`,
    },
    {
      href: `/${params.companyId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.companyId}/billboards`,
    },
    {
      href: `/${params.companyId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.companyId}/categories`,
    },
    {
      href: `/${params.companyId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.companyId}/sizes`,
    },
    {
      href: `/${params.companyId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.companyId}/colors`,
    },
    {
      href: `/${params.companyId}/products`,
      label: 'Products',
      active: pathname === `/${params.companyId}/products`,
    },
    {
      href: `/${params.companyId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.companyId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
