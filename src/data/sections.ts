import type { Lang } from './content';

export const sectionIds = {
  pt: { projects: 'projetos', work: 'experiencia', about: 'sobre', contact: 'contato' },
  en: { projects: 'projects', work: 'experience', about: 'about', contact: 'contact' },
} as const satisfies Record<Lang, Record<string, string>>;
