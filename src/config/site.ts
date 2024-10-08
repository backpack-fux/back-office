import { GithubIcon, TwitterIcon } from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Back Office",
  description: "Weapons of math destruction",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Merchants",
      href: "/merchants",
    },
    {
      label: "Partners",
      href: "/partners",
    },
    {
      label: "Onboards",
      href: "/onboards",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: {
      label: "GitHub",
      icon: GithubIcon,
      href: "https://github.com/backpack-fux",
    },
    twitter: {
      label: "Twitter",
      icon: TwitterIcon,
      href: "https://twitter.com/backpack_fux",
    },
    docs: {
      label: "Docs",
      href: "https://docs-backpack-network.vercel.app/",
    },
    discord: "https://discord.gg/fMf2CY5P",
    campaign: "https://fabric.xyz/",
  },
  partners: {
    bridge: "/",
    worldpay: "/",
    rain: "/",
    chase: "/",
    stripe: "/",
  },
};
