export type InfoIcon = "briefcase" | "pin" | "mail" | "gender" | "code" | "phone" | "globe";

export interface InfoItem {
  icon: InfoIcon;
  text: string;
  strong?: string;
  href?: string;
}

export type LinkId = "linkedin" | "github" | "x" | "dailydev";

export interface LinkItem {
  id: LinkId;
  label: string;
  handle: string;
  href: string;
}
