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
import btReport from '../assets/projects/bintriage/report.png';
import btGraph from '../assets/projects/bintriage/callgraph.png';

export type Slug = 'lyfia' | 'bintriage' | 'recuperavc';

type Link = { label: string; href: string; kind: 'web' | 'play' | 'github' };
type Shot = { src: ImageMetadata; alt: string; caption?: string };
type Section = { heading: string; body: string[]; shot?: Shot };

export type Project = {
  slug: Slug;
  name: string;
  field: 'petrol' | 'ink' | 'paper';
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

const btLinks: Record<Lang, Link[]> = {
  pt: [{ label: 'Código no GitHub', href: 'https://github.com/FellipeGabriel/bintriage', kind: 'github' }],
  en: [{ label: 'Code on GitHub', href: 'https://github.com/FellipeGabriel/bintriage', kind: 'github' }],
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
        'Resumo expandido aprovado no CONBRASP 2026',
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
    {
      slug: 'bintriage',
      name: 'bintriage',
      field: 'paper',
      kind: 'Ferramenta em C++, projeto pessoal, 2026',
      lead: 'Lê um executável do Windows ou do Linux sem rodá-lo e mostra o que ele importa, que proteções de segurança tem, onde ficam as funções e quem chama quem.',
      facts: [
        'C++20 com LIEF e Capstone, para binários PE e ELF x86_64',
        'Sem metadados, a descoberta de funções tem F1 de 0,80, medido em 39 binários reais',
        'Testado com ASan, UBSan e 269 entradas corrompidas de propósito',
      ],
      links: btLinks.pt,
      cover: { src: btReport, alt: 'Saída do bintriage no terminal para o /bin/ls: formato, ponto de entrada, proteções de segurança, seções com entropia e as primeiras funções encontradas.' },
      secondary: [
        { src: btGraph, alt: 'Grafo de chamadas do /bin/ls no terminal, partindo do ponto de entrada até as funções importadas da libc.' },
      ],
      meta: [
        { label: 'Ano', value: '2026' },
        { label: 'Tipo', value: 'Projeto pessoal' },
        { label: 'Formatos', value: 'PE e ELF, x86_64' },
        { label: 'Stack', value: 'C++20, CMake, vcpkg, LIEF, Capstone, Python' },
        { label: 'Código', value: 'github.com/FellipeGabriel/bintriage' },
      ],
      sections: [
        {
          heading: 'O problema',
          body: [
            'Diante de um executável desconhecido, a primeira pergunta é o que ele faz e se vale gastar horas com ele num disassembler. O bintriage responde isso em menos de um segundo na maioria dos binários, direto no terminal.',
            'Ele trata o arquivo como dado não confiável: confere cabeçalhos e limites antes de cada leitura e nunca carrega, mapeia ou executa o binário.',
          ],
        },
        {
          heading: 'Como acha as funções',
          body: [
            'Cada função vira um grafo de blocos básicos: a análise segue os desvios condicionais, resolve as tabelas de salto dos switch e separa chamadas finais (tail calls) de saltos dentro da própria função.',
            'Quando o binário traz metadados, eles viram pontos de partida: a tabela de exceções .pdata no Windows, o .eh_frame e as tabelas de símbolos no Linux, além de exports e callbacks TLS. O que sobra é coberto por uma busca de prólogos de função, confirmada decodificando as primeiras instruções.',
          ],
          shot: { src: btGraph, alt: 'Grafo de chamadas do /bin/ls no terminal, com funções internas, chamadas resolvidas e funções da libc.', caption: 'O grafo de chamadas parte do ponto de entrada; endereços são funções do próprio binário e nomes seguidos de uma biblioteca entre colchetes são funções importadas.' },
        },
        {
          heading: 'O que mais ele mostra',
          body: [
            'As proteções de segurança do binário, no estilo do checksec: PIE, NX, RELRO, canário de pilha e FORTIFY no Linux; ASLR, DEP, CFG, /GS e assinatura Authenticode no Windows.',
            'A entropia de cada seção e alertas de anomalia, como seção gravável e executável ao mesmo tempo, que costuma indicar código empacotado. E pistas do que o programa pode fazer a partir dos imports, como rede, criptografia e injeção em outros processos, apresentadas como pistas e não como veredito.',
            'O relatório sai no terminal, em JSON e em DOT, para desenhar o grafo no Graphviz.',
          ],
          shot: { src: btReport, alt: 'Relatório do bintriage para o /bin/ls com proteções de segurança, seções e entropia.', caption: 'O começo do relatório: formato, proteções de segurança e entropia por seção.' },
        },
        {
          heading: 'Como sei que funciona',
          body: [
            'Medi a descoberta de funções em 39 binários reais, de ferramentas do Linux a DLLs do System32, com 30.216 funções de referência tiradas das tabelas de símbolos, do .eh_frame e do .pdata. Sem usar nenhum metadado, o F1 é de 0,80; com os metadados, nos binários em que a conta é independente, chega a 0,98. O script que refaz essa conta está no repositório.',
            'Os testes rodam com AddressSanitizer e UndefinedBehaviorSanitizer e incluem 269 entradas malformadas ou corrompidas de propósito; nenhuma derruba nem trava a análise. A análise completa do notepad.exe leva cerca de 60 ms, e a da ntdll.dll, com mais de 7 mil funções, menos de meio segundo.',
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
        'Extended abstract accepted at CONBRASP 2026',
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
    {
      slug: 'bintriage',
      name: 'bintriage',
      field: 'paper',
      kind: 'C++ tool, personal project, 2026',
      lead: 'Reads a Windows or Linux executable without running it and shows what it imports, which security hardening it has, where its functions are, and what calls what.',
      facts: [
        'C++20 with LIEF and Capstone, for x86_64 PE and ELF binaries',
        'Without metadata, function discovery reaches 0.80 F1, measured on 39 real binaries',
        'Tested under ASan, UBSan, and 269 deliberately corrupted inputs',
      ],
      links: btLinks.en,
      cover: { src: btReport, alt: 'bintriage terminal output for /bin/ls: format, entry point, binary hardening, sections with entropy, and the first functions found.' },
      secondary: [
        { src: btGraph, alt: 'Call graph of /bin/ls in the terminal, from the entry point down to functions imported from libc.' },
      ],
      meta: [
        { label: 'Year', value: '2026' },
        { label: 'Type', value: 'Personal project' },
        { label: 'Formats', value: 'PE and ELF, x86_64' },
        { label: 'Stack', value: 'C++20, CMake, vcpkg, LIEF, Capstone, Python' },
        { label: 'Code', value: 'github.com/FellipeGabriel/bintriage' },
      ],
      sections: [
        {
          heading: 'The problem',
          body: [
            'Faced with an unknown executable, the first question is what it does and whether it deserves hours in a disassembler. bintriage answers that in under a second for most binaries, right in the terminal.',
            'It treats the file as untrusted data: headers and bounds are checked before every read, and the binary is never loaded, mapped, or executed.',
          ],
        },
        {
          heading: 'Finding functions',
          body: [
            'Each function becomes a graph of basic blocks: the analysis follows conditional branches, resolves switch jump tables, and tells tail calls apart from jumps inside the same function.',
            'When the binary carries metadata, it becomes a starting point: the .pdata exception table on Windows, .eh_frame and the symbol tables on Linux, plus exports and TLS callbacks. Whatever is left is covered by a scan for function prologues, confirmed by decoding the first instructions.',
          ],
          shot: { src: btGraph, alt: 'Call graph of /bin/ls in the terminal, with internal functions, resolved calls, and libc functions.', caption: 'The call graph starts at the entry point; addresses are functions inside the binary and names followed by a bracketed library are imported functions.' },
        },
        {
          heading: 'What else it reports',
          body: [
            'Binary hardening checks in the style of checksec: PIE, NX, RELRO, stack canaries, and FORTIFY on Linux; ASLR, DEP, CFG, /GS, and Authenticode signatures on Windows.',
            'Per-section entropy and anomaly flags, such as sections that are both writable and executable, a common sign of packed code. And hints about what the program can do based on its imports, such as networking, cryptography, and injecting into other processes, presented as hints rather than verdicts.',
            'The report comes out in the terminal, as JSON, and as DOT for drawing the graph with Graphviz.',
          ],
          shot: { src: btReport, alt: 'bintriage report for /bin/ls with binary hardening, sections, and entropy.', caption: 'The top of the report: format, binary hardening, and per-section entropy.' },
        },
        {
          heading: 'How I know it works',
          body: [
            'I measured function discovery on 39 real binaries, from Linux tools to System32 DLLs, against 30,216 reference functions taken from symbol tables, .eh_frame, and .pdata. With all metadata turned off, F1 is 0.80; with metadata, on the binaries where the score is independent, it reaches 0.98. The script that reruns the numbers is in the repository.',
            'The tests run under AddressSanitizer and UndefinedBehaviorSanitizer and include 269 malformed or deliberately corrupted inputs; none of them crashes or hangs the analysis. A full analysis of notepad.exe takes about 60 ms, and ntdll.dll, with more than 7,000 functions, takes under half a second.',
          ],
        },
      ],
    },
  ],
};

export const nextSlug = (slug: Slug): Slug => {
  const order = projects.pt.map((x) => x.slug);
  return order[(order.indexOf(slug) + 1) % order.length];
};
