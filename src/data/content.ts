export type Lang = 'pt' | 'en';

export const EMAIL = 'goncalvesaraujofellipe@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/gabrielfellipe/';
export const GITHUB = 'https://github.com/FellipeGabriel';
export const REPO = 'https://github.com/FellipeGabriel/portfolio';

export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const routes = {
  pt: { home: withBase('/pt/'), project: (slug: string) => withBase(`/pt/projetos/${slug}/`) },
  en: { home: withBase('/en/'), project: (slug: string) => withBase(`/en/projects/${slug}/`) },
} as const;

export const ui = {
  pt: {
    htmlLang: 'pt-BR',
    title: 'Fellipe Gabriel, desenvolvedor full stack',
    description:
      'Portfólio de Fellipe Gabriel, desenvolvedor full stack. Node.js, React, TypeScript, PostgreSQL e Python. Projetos: Lyfia, bintriage e RecuperAVC.',
    skip: 'Pular para o conteúdo',
    nav: { projects: 'Projetos', work: 'Experiência', about: 'Sobre', contact: 'Contato', menu: 'Menu', close: 'Fechar', home: 'Início' },
    otherLang: { code: 'EN', label: 'Read in English' },
    hero: {
      role: 'Desenvolvedor full stack',
      lead: 'Há quase 3 anos desenvolvo software para o mercado financeiro, com Node.js, React, TypeScript, PostgreSQL e Python.',
      emailCta: 'Enviar e-mail',
      copy: 'Copiar e-mail',
      copied: 'E-mail copiado',
    },
    projects: {
      heading: 'Projetos',
      lead: 'Um painel público sobre o acesso à hemodiálise no SUS, uma ferramenta em C++ que examina executáveis sem rodá-los e um app Android de reabilitação pós-AVC publicado na Google Play.',
      howItWasMade: 'Como foi feito',
    },
    work: {
      heading: 'Experiência',
      education: 'Formação',
    },
    pubs: { heading: 'Publicações' },
    about: {
      heading: 'Sobre',
      body: [
        'No trabalho, passo por todas as camadas de uma aplicação web: modelagem no PostgreSQL, API em Node.js, interface em React, testes automatizados e CI/CD.',
        'Na UFPR, faço pesquisa em saúde digital: R e estatística espacial no Lyfia, Kotlin e código nativo em C/C++ no RecuperAVC.',
        'Idiomas: português (nativo), inglês (C1) e alemão (B1).',
      ],
      stackHeading: 'Com o que eu trabalho',
      photoAlt: 'Foto de Fellipe Gabriel',
    },
    contact: {
      heading: 'Contato',
      lead: 'Para falar sobre vagas ou sobre algum dos projetos, o caminho mais rápido é o e-mail.',
    },
    footer: {
      credits: 'Fotos: Unsplash e Wikimedia Commons (CC0); nuvens de sagesolar, CC BY 4.0',
      source: 'Código deste site',
    },
    caseStudy: {
      year: 'Ano',
      kind: 'Tipo',
      role: 'Meu papel',
      stack: 'Stack',
      code: 'Código',
      links: 'Links',
      publications: 'Publicações',
      next: 'Próximo projeto',
      back: 'Voltar aos projetos',
      privateRepo: 'Repositório privado',
    },
    notFound: { title: 'Página não encontrada', body: 'Esse endereço não existe.', back: 'Ir para o início' },
  },
  en: {
    htmlLang: 'en',
    title: 'Fellipe Gabriel, full stack developer',
    description:
      'Portfolio of Fellipe Gabriel, full stack developer. Node.js, React, TypeScript, PostgreSQL, and Python. Projects: Lyfia, bintriage, and RecuperAVC.',
    skip: 'Skip to content',
    nav: { projects: 'Projects', work: 'Experience', about: 'About', contact: 'Contact', menu: 'Menu', close: 'Close', home: 'Home' },
    otherLang: { code: 'PT', label: 'Ler em português' },
    hero: {
      role: 'Full stack developer',
      lead: "I've spent nearly 3 years building software for the financial industry with Node.js, React, TypeScript, PostgreSQL, and Python.",
      emailCta: 'Send an email',
      copy: 'Copy email',
      copied: 'Email copied',
    },
    projects: {
      heading: 'Projects',
      lead: "A public dashboard on access to hemodialysis in Brazil's public health system, a C++ tool that inspects executables without running them, and a post-stroke rehabilitation app on Google Play.",
      howItWasMade: 'How it was built',
    },
    work: {
      heading: 'Experience',
      education: 'Education',
    },
    pubs: { heading: 'Publications' },
    about: {
      heading: 'About',
      body: [
        'At work I cover every layer of a web application: PostgreSQL data modeling, Node.js APIs, React interfaces, automated tests, and CI/CD.',
        'At UFPR I do digital health research: R and spatial statistics on Lyfia, Kotlin and native C/C++ code on RecuperAVC.',
        'Languages: Portuguese (native), English (C1), and German (B1).',
      ],
      stackHeading: 'What I work with',
      photoAlt: 'Photo of Fellipe Gabriel',
    },
    contact: {
      heading: 'Contact',
      lead: 'To talk about a role or one of the projects, email is the fastest way to reach me.',
    },
    footer: {
      credits: 'Photos: Unsplash and Wikimedia Commons (CC0); clouds by sagesolar, CC BY 4.0',
      source: 'Source code for this site',
    },
    caseStudy: {
      year: 'Year',
      kind: 'Type',
      role: 'My role',
      stack: 'Stack',
      code: 'Code',
      links: 'Links',
      publications: 'Publications',
      next: 'Next project',
      back: 'Back to projects',
      privateRepo: 'Private repository',
    },
    notFound: { title: 'Page not found', body: "This address doesn't exist.", back: 'Go to the home page' },
  },
} as const;

export type Job = {
  role: string;
  org: string;
  period: string;
  lead: string;
  items: string[];
};

export const work: Record<Lang, { jobs: Job[]; education: Job[] }> = {
  pt: {
    jobs: [
      {
        role: 'Desenvolvedor Full Stack',
        org: 'TRC Taborda',
        period: 'mar. 2024 – atual',
        lead: 'Desenvolvimento full stack de sistemas internos para o mercado financeiro.',
        items: [
          'Desenvolvi uma plataforma interna com API em Node.js e Express, serviço de dados em Python, PostgreSQL e cache em Redis.',
          'Conduzi a migração para um monorepo TypeScript, com React, Vite e Tailwind CSS no front-end, API em Fastify, Drizzle ORM no PostgreSQL e Zod na validação de entrada e saída.',
          'Montei o CI no GitHub Actions: cada pull request roda lint, checagem de tipos, testes com Vitest contra um PostgreSQL efêmero, auditoria de dependências e varredura de segredos.',
          'Automatizei o deploy a partir do artefato validado no CI, com health check e rollback automático.',
          'Otimizei dashboards em ECharts com ajuste do pool de conexões, um pool separado para as rotinas e cache com revalidação em segundo plano no React.',
          'Escrevi rotinas agendadas em Node.js e Python que consolidam dados de várias origens no PostgreSQL, com retentativa e timeout por origem.',
          'Apliquei práticas do OWASP: autenticação com JWT, permissões por perfil, rate limit, validação de entrada e trilha de auditoria.',
          'Integrei IA generativa com saída estruturada em JSON Schema e anonimização dos dados antes do envio.',
        ],
      },
    ],
    education: [
      {
        role: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
        org: 'Universidade Federal do Paraná',
        period: 'out. 2022 – dez. 2026 (previsão)',
        lead: 'Pesquisa em saúde digital, que resultou no Lyfia e no RecuperAVC.',
        items: [
          'No MioDottore, sistema hospitalar com microsserviços em Spring Boot e gateway em Node.js, fiz parte do back-end, a integração dos containers no Docker Compose e o envio de e-mail.',
          'Em DevOps, montei no GitHub Actions o pipeline de um app Expo: testes em matriz de versões do Node, deploy da versão web no GitHub Pages, APK publicado como release e imagem Docker multiarquitetura no Docker Hub.',
          'Desenvolvi com colegas um sistema de gestão de frotas em Angular 19, com back-end em Spring Boot e Spring Security.',
          'Modelei um data warehouse de varejo em PostgreSQL, com esquema estrela de cinco dimensões, staging e ETL escrito em SQL.',
          'Analisei em R, com igraph, a robustez e a hierarquia de redes de interação entre proteínas, com decomposição em K-core e simulação de ataques direcionados e falhas aleatórias.',
        ],
      },
    ],
  },
  en: {
    jobs: [
      {
        role: 'Full Stack Developer',
        org: 'TRC Taborda',
        period: 'Mar 2024 – Present',
        lead: 'Full stack development of internal systems for financial services.',
        items: [
          'Built an internal platform with a Node.js and Express API, a Python data service, PostgreSQL, and Redis caching.',
          'Led the migration to a TypeScript monorepo with a React, Vite, and Tailwind CSS frontend, a Fastify API, Drizzle ORM on PostgreSQL, and Zod for request and response validation.',
          'Set up CI on GitHub Actions: every pull request runs linting, type checks, Vitest tests against an ephemeral PostgreSQL instance, a dependency audit, and secret scanning.',
          'Automated deployment from the CI-validated build artifact, with health checks and automatic rollback.',
          'Optimized ECharts dashboards by tuning the connection pool, isolating background jobs in a separate pool, and adding stale-while-revalidate caching in React.',
          'Wrote scheduled Node.js and Python jobs that consolidate data from several sources into PostgreSQL, with retries and a timeout per source.',
          'Applied OWASP practices: JWT authentication, role-based permissions, rate limiting, input validation, and an audit trail.',
          'Integrated generative AI with JSON Schema structured output and data anonymized before each request.',
        ],
      },
    ],
    education: [
      {
        role: 'Technologist Degree in Systems Analysis and Development',
        org: 'Federal University of Paraná (UFPR)',
        period: 'Oct 2022 – Dec 2026 (expected)',
        lead: 'Digital health research that led to Lyfia and RecuperAVC.',
        items: [
          'On MioDottore, a hospital management system built as Spring Boot microservices behind a Node.js gateway, I worked on the backend, wired the containers together with Docker Compose, and built the email delivery.',
          'For a DevOps course, I built the GitHub Actions pipeline for an Expo app: tests across a Node version matrix, the web build deployed to GitHub Pages, the APK published as a release, and a multi-architecture Docker image pushed to Docker Hub.',
          'Built a fleet management system with classmates in Angular 19, with a Spring Boot and Spring Security backend.',
          'Designed a retail data warehouse in PostgreSQL with a five-dimension star schema, a staging layer, and ETL written in SQL.',
          'Analyzed robustness and hierarchy in protein interaction networks in R with igraph, using K-core decomposition and simulated targeted attacks and random failures.',
        ],
      },
    ],
  },
};

export type Publication = {
  year: string;
  venue: string;
  status: string;
  title: string;
  authors?: string;
  project: 'lyfia' | 'recuperavc';
};

export const publications: Record<Lang, Publication[]> = {
  pt: [
    {
      year: '2027',
      venue: "ICITS'27, 10th International Conference on Information Technology & Systems",
      status: 'Artigo completo aceito',
      title: 'Mapping Potential Access to Public Hemodialysis in Brazil, 2017 to 2024',
      project: 'lyfia',
    },
    {
      year: '2026',
      venue: 'XXI Congresso Brasileiro de Informática em Saúde (CBIS)',
      status: 'Artigo original, apresentado',
      title: 'RecuperAVC: Plataforma Digital para Monitoramento Longitudinal da Reabilitação Pós-AVC Baseada em Biomarcadores',
      authors: 'Fellipe Gabriel, Paulo Eduardo Bayer Kresko e Alessandro Brawerman',
      project: 'recuperavc',
    },
    {
      year: '2026',
      venue: 'VI Congresso Brasileiro de Saúde Pública (CONBRASP)',
      status: 'Resumo expandido, aprovado',
      title: 'Desigualdades regionais no acesso à hemodiálise no SUS: análise preliminar e estruturação de um painel de monitoramento',
      authors: 'Fellipe Gabriel e Alessandro Brawerman',
      project: 'lyfia',
    },
  ],
  en: [
    {
      year: '2027',
      venue: "ICITS'27, 10th International Conference on Information Technology & Systems",
      status: 'Full paper, accepted',
      title: 'Mapping Potential Access to Public Hemodialysis in Brazil, 2017 to 2024',
      project: 'lyfia',
    },
    {
      year: '2026',
      venue: '21st Brazilian Congress of Health Informatics (CBIS)',
      status: 'Full paper, presented',
      title: 'RecuperAVC: Plataforma Digital para Monitoramento Longitudinal da Reabilitação Pós-AVC Baseada em Biomarcadores',
      authors: 'Fellipe Gabriel, Paulo Eduardo Bayer Kresko, and Alessandro Brawerman',
      project: 'recuperavc',
    },
    {
      year: '2026',
      venue: '6th Brazilian Congress of Public Health (CONBRASP)',
      status: 'Extended abstract, accepted',
      title: 'Desigualdades regionais no acesso à hemodiálise no SUS: análise preliminar e estruturação de um painel de monitoramento',
      authors: 'Fellipe Gabriel and Alessandro Brawerman',
      project: 'lyfia',
    },
  ],
};

export const stack: Record<Lang, { group: string; items: string }[]> = {
  pt: [
    { group: 'Linguagens', items: 'TypeScript, JavaScript, Python, SQL, R, Kotlin, C++' },
    { group: 'Back-end', items: 'Node.js, Fastify, Express, PostgreSQL, Redis, Drizzle ORM, Zod' },
    { group: 'Front-end', items: 'React, Vite, Tailwind CSS, ECharts, Canvas 2D' },
    { group: 'Mobile', items: 'Android, Jetpack Compose, Room, JNI e NDK' },
    { group: 'C++ e análise binária', items: 'CMake, vcpkg, LIEF, Capstone, ASan e UBSan' },
    { group: 'Dados', items: 'targets, renv, SQLite, ETL, estatística espacial' },
    { group: 'Infra e qualidade', items: 'Docker, GitHub Actions, Vitest, Playwright, OWASP' },
  ],
  en: [
    { group: 'Languages', items: 'TypeScript, JavaScript, Python, SQL, R, Kotlin, C++' },
    { group: 'Backend', items: 'Node.js, Fastify, Express, PostgreSQL, Redis, Drizzle ORM, Zod' },
    { group: 'Frontend', items: 'React, Vite, Tailwind CSS, ECharts, Canvas 2D' },
    { group: 'Mobile', items: 'Android, Jetpack Compose, Room, JNI and NDK' },
    { group: 'C++ and binary analysis', items: 'CMake, vcpkg, LIEF, Capstone, ASan, and UBSan' },
    { group: 'Data', items: 'targets, renv, SQLite, ETL, spatial statistics' },
    { group: 'Infrastructure and quality', items: 'Docker, GitHub Actions, Vitest, Playwright, OWASP' },
  ],
};
