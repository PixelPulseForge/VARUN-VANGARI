
import type { IconType } from "react-icons";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiMobxstatetree } from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiPhp,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiShadcnui,
  SiAntdesign,
  SiMui,
  SiReactrouter,
  SiRedux,
  SiGit,
  SiMysql,
  SiGraphql,
  SiFigma,
  SiClaude,
  SiPostman,
  SiNotion,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJquery,
  SiHtml5,
  SiVite,
  SiSass,
  SiVercel,
} from "react-icons/si";

import {
  RiOpenaiFill,
  RiCursorFill,
  RiHeartFill,
} from "react-icons/ri";

import { DiPhotoshop } from "react-icons/di";

export interface StackItem {
  name: string;
  Icon: IconType;
  color: string;
}

export const stack: StackItem[] = [
  // Programming languages
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
  { name: "Python", Icon: SiPython, color: "#3776ab" },
  { name: "PHP", Icon: SiPhp, color: "#777bb4" },

  // Frontend development
  { name: "HTML5", Icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", Icon: IoLogoCss3, color: "#1572b6" },
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "React Router", Icon: SiReactrouter, color: "#ca4245" },
  { name: "jQuery", Icon: SiJquery, color: "#0769ad" },

  // UI frameworks
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3" },
  { name: "shadcn/ui", Icon: SiShadcnui, color: "#ffffff" },
  { name: "Ant Design", Icon: SiAntdesign, color: "#0170fe" },
  { name: "Material UI", Icon: SiMui, color: "#007fff" },
  { name: "Sass", Icon: SiSass, color: "#cc6699" },

  // Animation and state management
  { name: "Motion", Icon: TbBrandFramerMotion, color: "#ffffff" },
  { name: "Redux", Icon: SiRedux, color: "#764abc" },
  { name: "MobX", Icon: SiMobxstatetree, color: "#ff9955" },

  // Backend
  { name: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
  { name: "Express.js", Icon: SiExpress, color: "#ffffff" },
  { name: "GraphQL", Icon: SiGraphql, color: "#e10098" },

  // Databases
  { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },

  // Developer tools
  { name: "Git", Icon: SiGit, color: "#f05032" },
  { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
  { name: "Vite", Icon: SiVite, color: "#646cff" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },

  // Design and productivity
  { name: "Figma", Icon: SiFigma, color: "#f24e1e" },
  // { name: "Photoshop", Icon: DiPhotoshop, color: "#31a8ff" },
  // { name: "Canva", Icon: RiHeartFill, color: "#00c4cc" },
  { name: "Notion", Icon: SiNotion, color: "#ffffff" },

  // AI tools
  // { name: "Cursor", Icon: RiCursorFill, color: "#ffffff" },
  // { name: "Lovable", Icon: RiHeartFill, color: "#ff4f9a" },
  // { name: "OpenAI", Icon: RiOpenaiFill, color: "#ffffff" },
  // { name: "OpenAI Codex", Icon: RiOpenaiFill, color: "#ffffff" },
  { name: "Claude", Icon: SiClaude, color: "#d97757" },
];
