import type { ImageMetadata } from 'astro';
import type { Lang } from './content';

import lyfiaPainel from '../assets/projects/lyfia/painel.png';
import lyfiaMetodo from '../assets/projects/lyfia/metodo.png';
import lyfiaDados from '../assets/projects/lyfia/dados.png';
import lyfiaMobile from '../assets/projects/lyfia/mobile.png';
import recHome from '../assets/projects/recuperavc/home.png';
import recFala from '../assets/projects/recuperavc/fala.jpg';
import recPreferencias from '../assets/projects/recuperavc/preferencias.jpg';
import recRelatorio from '../assets/projects/recuperavc/relatorio.jpg';

export type Slug = 'lyfia' | 'recuperavc';

type Link = { label: string; href: string; kind: 'web' | 'play' | 'github' };
type Shot = { src: ImageMetadata; alt: string; caption?: string };
type Section = { heading: string; body: string[]; shot?: Shot };

export type Project = {
  slug: Slug;
  name: string;
  field: 'petrol' | 'ink';
  kind: string;
  lead: string;
  facts: string[];
  links: Link[];
  cover: Shot;
  secondary: Shot[];
  qr?: { url: string; label: string };
  meta: { label: string; value: string }[];
  sections: Section[];
};

const lyfiaLinks: Record<Lang, Link[]> = {
  pt: [{ label: 'Abrir o painel', href: 'https://lyfia.pages.dev', kind: 'web' }],
  en: [{ label: 'Open the dashboard', href: 'https://lyfia.pages.dev', kind: 'web' }],
};

const recLinks: Record<Lang, Link[]> = {
  pt: [
    { label: 'Ver na Google Play', href: 'https://play.google.com/store/apps/details?id=com.recuperavc', kind: 'play' },
    { label: 'Código no GitHub', href: 'https://github.com/PauloBayer/recuperavc', kind: 'github' },
  ],
  en: [
    { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.recuperavc', kind: 'play' },
    { label: 'Code on GitHub', href: 'https://github.com/PauloBayer/recuperavc', kind: 'github' },
  ],
};

export const projects: Record<Lang, Project[]> = {
  pt: [
    {
      slug: 'lyfia',
      name: 'Lyfia',
      field: 'petrol',
      kind: 'Pesquisa e painel público, 2026',
      lead: 'Mede, para cada região de saúde do Brasil, quantas máquinas de hemodiálise do SUS estão ao alcance por 100 mil moradores, de 2017 a 2024.',
      facts: [
        'Pipeline reprodutível em R, com dados do DATASUS e do IBGE e rotas do OpenRouteService',
        'Painel em React 19 e TypeScript, com o mapa desenhado em Canvas 2D',
        "Artigo completo aceito no ICITS'27",
      ],
      links: lyfiaLinks.pt,
      cover: { src: lyfiaPainel, alt: 'Tela do painel Lyfia: mapa do Brasil com as regiões de saúde coloridas pelo número de máquinas ao alcance, ao lado de um gráfico da série 2017 a 2024.' },
      secondary: [
        { src: lyfiaMobile, alt: 'O painel Lyfia aberto num celular, com o mapa e a legenda.' },
      ],
      meta: [
        { label: 'Ano', value: '2026' },
        { label: 'Tipo', value: 'Pesquisa na UFPR' },
        { label: 'Meu papel', value: 'Pipeline de dados, análise e painel' },
        { label: 'Stack', value: 'R, targets, renv, SQLite, React 19, TypeScript, Canvas 2D, Playwright' },
        { label: 'Código', value: 'Repositório privado' },
      ],
      sections: [
        {
          heading: 'O problema',
          body: [
            'Quem faz hemodiálise vai à clínica várias vezes por semana, então a distância até o serviço pesa no tratamento. Os dados para medir isso existem, mas ficam espalhados entre o DATASUS, o IBGE e outras bases.',
            'O Lyfia junta essas fontes e calcula, para cada região de saúde, quantas máquinas do SUS estão ao alcance por 100 mil moradores e como isso mudou de 2017 a 2024.',
          ],
        },
        {
          heading: 'Os dados',
          body: [
            'Montei o pipeline em R com targets, que refaz só as etapas afetadas quando algo muda, e fixei as dependências com renv para que outra pessoa rode e chegue ao mesmo resultado.',
            'As ingestões gravam em SQLite e podem rodar de novo sem duplicar nada. Entram CNES, SIA/SUS, SIGTAP, IBGE, RIPSA e as rotas do OpenRouteService, cobrindo os 5.570 municípios.',
          ],
          shot: { src: lyfiaDados, alt: 'Aba Dados do Lyfia: tabela com as regiões de saúde e lista de arquivos para baixar, cada um com licença e hash.', caption: 'A aba Dados publica as tabelas usadas no painel, com licença e hash de cada arquivo.' },
        },
        {
          heading: 'A análise',
          body: [
            'O índice é o E2SFCA, uma razão entre oferta e demanda ponderada pela distância. Comparei a distância em linha reta com a distância e o tempo rodoviários e rodei análises de sensibilidade de raio, decaimento e demanda ponderada por idade.',
            'Para saber se as regiões sem acesso se concentram no mapa, usei Moran global e LISA nas 450 regiões de saúde, com 99.999 permutações e correção de Benjamini-Hochberg.',
            'Na validação, o índice tem correlação de Spearman de −0,60 com o atendimento feito fora da região: onde o acesso é pior, mais gente se trata longe de casa.',
          ],
          shot: { src: lyfiaMetodo, alt: 'Aba Método do Lyfia: diagrama passo a passo do cálculo do índice, com um serviço e as populações ao alcance dele.', caption: 'A aba Método mostra o cálculo do índice passo a passo.' },
        },
        {
          heading: 'O painel',
          body: [
            'O painel é em React 19 e TypeScript. Comecei com o MapLibre e troquei por um renderizador próprio em Canvas 2D: o JavaScript inicial caiu de 369 KB para 95 KB (gzip) e o zoom roda a 60 fps sem GPU.',
            'As tabelas são virtualizadas com TanStack e o estado fica na URL com Zustand, então dá para mandar o link de uma visão específica. Os testes e2e com Playwright e axe checam acessibilidade, inclusive com simulação de daltonismo.',
            'O recálculo do índice no navegador bate com o do R, com erro máximo de 10⁻⁷. O site está no Cloudflare Pages, com CSP e conferência de SHA-256 dos arquivos.',
          ],
        },
      ],
    },
    {
      slug: 'recuperavc',
      name: 'RecuperAVC',
      field: 'ink',
      kind: 'App Android, TCC, 2025–2026',
      lead: 'Testes de fala, linguagem e coordenação motora para acompanhar a reabilitação depois de um AVC. A fala é transcrita no próprio celular, sem internet.',
      facts: [
        'Kotlin e Jetpack Compose, com Room guardando o histórico no aparelho',
        'Whisper.cpp integrado via JNI e compilado com o NDK',
        'Artigo original apresentado no CBIS 2026',
      ],
      links: recLinks.pt,
      cover: { src: recHome, alt: 'Tela inicial do RecuperAVC com os três testes: raciocínio, reconhecimento de voz e coordenação motora.' },
      secondary: [
        { src: recFala, alt: 'Teste de fala durante a gravação: a frase a pronunciar e o botão para cancelar.' },
        { src: recPreferencias, alt: 'Preferências do app no modo escuro: alto contraste, modo escuro e tamanho do texto.' },
      ],
      qr: { url: 'https://play.google.com/store/apps/details?id=com.recuperavc', label: 'Aponte a câmera para abrir na Google Play.' },
      meta: [
        { label: 'Ano', value: '2025–2026' },
        { label: 'Tipo', value: 'TCC na UFPR' },
        { label: 'Meu papel', value: 'Desenvolvimento do app e publicação na Google Play' },
        { label: 'Stack', value: 'Kotlin, Jetpack Compose, MVVM, Room, Whisper.cpp, JNI, NDK' },
        { label: 'Código', value: 'github.com/PauloBayer/recuperavc' },
      ],
      sections: [
        {
          heading: 'O problema',
          body: [
            'Depois de um AVC, a reabilitação depende de acompanhar a fala, a linguagem e a coordenação motora ao longo de semanas.',
            'O RecuperAVC aplica testes curtos no celular e guarda o histórico para o paciente e para a equipe que acompanha o tratamento.',
          ],
        },
        {
          heading: 'Os testes',
          body: [
            'No teste de fala, a pessoa lê uma frase em voz alta e o app calcula palavras por minuto e taxa de erro.',
            'No de linguagem, ela reorganiza as palavras de uma frase embaralhada, e o app mede o tempo e os erros. No de coordenação motora, ela toca um botão o máximo de vezes que conseguir, com o botão parado ou mudando de lugar.',
          ],
          shot: { src: recRelatorio, alt: 'Tela de relatórios do RecuperAVC com filtros por período, mão utilizada e mão dominante.', caption: 'Os relatórios mostram a evolução de cada teste por período, com filtro pela mão usada.' },
        },
        {
          heading: 'Transcrição sem internet',
          body: [
            'A transcrição usa o Whisper.cpp, escrito em C/C++, chamado a partir do Kotlin via JNI. O áudio não sai do aparelho.',
            'Para rodar em celulares comuns, ajustei os parâmetros de decodificação, compilei a biblioteca com -O3 no NDK e escrevi a detecção de silêncio.',
          ],
        },
        {
          heading: 'O app',
          body: [
            'O app segue a arquitetura MVVM em Kotlin com Jetpack Compose e salva o histórico no aparelho com Room.',
            'Tem modo claro, escuro e de alto contraste, ajuste do tamanho da fonte e relatórios em PDF com gráficos.',
          ],
          shot: { src: recPreferencias, alt: 'Preferências do RecuperAVC no modo escuro, com opções de alto contraste, modo escuro e tamanho do texto.', caption: 'As preferências ajustam contraste, tema e tamanho do texto, com uma prévia na própria tela.' },
        },
        {
          heading: 'Na loja',
          body: [
            'Publiquei o app na Google Play e cuido do Play Console, das versões e das exigências da loja, como a API 36.',
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: 'lyfia',
      name: 'Lyfia',
      field: 'petrol',
      kind: 'Research and public dashboard, 2026',
      lead: "Measures, for each of Brazil's health regions, how many public hemodialysis machines are within reach per 100,000 residents, from 2017 to 2024.",
      facts: [
        'Reproducible R pipeline using public health data (DATASUS), census data (IBGE), and OpenRouteService routes',
        'Dashboard in React 19 and TypeScript, with the map drawn in Canvas 2D',
        "Full paper accepted at ICITS'27",
      ],
      links: lyfiaLinks.en,
      cover: { src: lyfiaPainel, alt: 'The Lyfia dashboard: a map of Brazil with health regions shaded by the number of machines within reach, next to a 2017 to 2024 trend chart.' },
      secondary: [
        { src: lyfiaMobile, alt: 'The Lyfia dashboard on a phone, showing the map and its legend.' },
      ],
      meta: [
        { label: 'Year', value: '2026' },
        { label: 'Type', value: 'Research at UFPR' },
        { label: 'My role', value: 'Data pipeline, analysis, and dashboard' },
        { label: 'Stack', value: 'R, targets, renv, SQLite, React 19, TypeScript, Canvas 2D, Playwright' },
        { label: 'Code', value: 'Private repository' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            "Hemodialysis patients go to a clinic several times a week, so the distance to the nearest service shapes their treatment. The data to measure this exists, but it's spread across DATASUS, IBGE, and other sources.",
            'Lyfia combines those sources and calculates, for each health region, how many public machines are within reach per 100,000 residents and how that changed from 2017 to 2024.',
          ],
        },
        {
          heading: 'The data',
          body: [
            'I built the pipeline in R with targets, which only reruns the steps affected by a change, and pinned the dependencies with renv so someone else can run it and get the same result.',
            'Ingestion writes to SQLite and can run again without duplicating anything. Sources are CNES, SIA/SUS, SIGTAP, IBGE, RIPSA, and OpenRouteService routes, covering all 5,570 municipalities.',
          ],
          shot: { src: lyfiaDados, alt: "Lyfia's Data tab: a table of health regions and a list of downloadable files, each with its license and hash.", caption: 'The Data tab publishes the tables behind the dashboard, with a license and hash for each file.' },
        },
        {
          heading: 'The analysis',
          body: [
            'The index is E2SFCA, a distance-weighted ratio of supply to demand. I compared straight-line distance with road distance and travel time, and ran sensitivity analyses on catchment radius, distance decay, and age-weighted demand.',
            "To check whether regions without access cluster on the map, I used global Moran's I and LISA across the 450 health regions, with 99,999 permutations and Benjamini-Hochberg correction.",
            'For validation, the index has a Spearman correlation of −0.60 with care received outside the region: where access is worse, more people travel away from home for treatment.',
          ],
          shot: { src: lyfiaMetodo, alt: "Lyfia's Method tab: a step-by-step diagram of the index calculation, with one service and the populations within its reach.", caption: 'The Method tab walks through the index calculation step by step.' },
        },
        {
          heading: 'The dashboard',
          body: [
            'The dashboard is React 19 and TypeScript. I started with MapLibre and replaced it with my own Canvas 2D renderer: initial JavaScript dropped from 369 KB to 95 KB (gzip), and zooming runs at 60 fps without a GPU.',
            'Tables are virtualized with TanStack, and state lives in the URL through Zustand, so you can share a link to a specific view. End-to-end tests with Playwright and axe check accessibility, including color blindness simulation.',
            "The in-browser recalculation of the index matches R's output within 10⁻⁷. The site runs on Cloudflare Pages with a CSP and SHA-256 checks on the published files.",
          ],
        },
      ],
    },
    {
      slug: 'recuperavc',
      name: 'RecuperAVC',
      field: 'ink',
      kind: 'Android app, capstone project, 2025–2026',
      lead: 'Speech, language, and motor coordination tests to track rehabilitation after a stroke. Speech is transcribed on the phone itself, with no internet connection.',
      facts: [
        'Kotlin and Jetpack Compose, with Room keeping the history on the device',
        'Whisper.cpp integrated through JNI and built with the NDK',
        'Full paper presented at CBIS 2026',
      ],
      links: recLinks.en,
      cover: { src: recHome, alt: 'RecuperAVC home screen with the three tests: reasoning, speech recognition, and motor coordination.' },
      secondary: [
        { src: recFala, alt: 'Speech test while recording: the sentence to read and the cancel button.' },
        { src: recPreferencias, alt: 'App preferences in dark mode: high contrast, dark mode, and text size.' },
      ],
      qr: { url: 'https://play.google.com/store/apps/details?id=com.recuperavc', label: 'Scan to open it on Google Play.' },
      meta: [
        { label: 'Year', value: '2025–2026' },
        { label: 'Type', value: 'Capstone project at UFPR' },
        { label: 'My role', value: 'App development and Google Play release' },
        { label: 'Stack', value: 'Kotlin, Jetpack Compose, MVVM, Room, Whisper.cpp, JNI, NDK' },
        { label: 'Code', value: 'github.com/PauloBayer/recuperavc' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'After a stroke, rehabilitation depends on tracking speech, language, and motor coordination over weeks.',
            'RecuperAVC runs short tests on a phone and keeps the history for the patient and for the team following the treatment.',
          ],
        },
        {
          heading: 'The tests',
          body: [
            'In the speech test, the person reads a sentence aloud and the app computes words per minute and word error rate.',
            'In the language test, they put the words of a shuffled sentence back in order, and the app measures time and errors. In the motor test, they tap a button as many times as they can, with the button either fixed or moving around the screen.',
          ],
          shot: { src: recRelatorio, alt: 'RecuperAVC reports screen with filters for period, hand used, and dominant hand.', caption: 'Reports show how each test changes over time, filtered by the hand used.' },
        },
        {
          heading: 'Offline transcription',
          body: [
            "Transcription uses Whisper.cpp, written in C/C++, called from Kotlin through JNI. Audio never leaves the device.",
            'To make it run on mid-range phones, I tuned the decoding parameters, built the library with -O3 through the NDK, and wrote the silence detection.',
          ],
        },
        {
          heading: 'The app',
          body: [
            'The app follows an MVVM architecture in Kotlin with Jetpack Compose and keeps the test history on the device with Room.',
            'It has light, dark, and high-contrast themes, adjustable font size, and PDF reports with charts.',
          ],
          shot: { src: recPreferencias, alt: 'RecuperAVC preferences in dark mode, with high contrast, dark mode, and text size options.', caption: 'Preferences adjust contrast, theme, and text size, with a live preview on the same screen.' },
        },
        {
          heading: 'On Google Play',
          body: [
            'I published the app on Google Play and handle the Play Console, releases, and store requirements such as targeting API 36.',
          ],
        },
      ],
    },
  ],
};

export const otherSlug = (slug: Slug): Slug => (slug === 'lyfia' ? 'recuperavc' : 'lyfia');
