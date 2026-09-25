import ana from "@/assets/ana.jpg";
import julia from "@/assets/julia.jpg";
import marina from "@/assets/marina.jpg";
import carolina from "@/assets/carolina.jpg";

/**
 * Camada de dados mockada.
 * A forma dos tipos espelha as tabelas previstas no backend
 * (matches, conversations, messages, conversation_memory, ai_suggestions,
 * dates, calendar_events, follow_ups, ai_settings, integrations),
 * para que a troca por dados reais seja apenas de origem, não de formato.
 */

export type ConversationStatus =
  | "NEW"
  | "ACTIVE"
  | "WAITING_REPLY"
  | "POSSIBLE_DATE"
  | "DATE_SCHEDULED"
  | "DATE_COMPLETED"
  | "ARCHIVED";

export const statusLabel: Record<ConversationStatus, string> = {
  NEW: "Novo",
  ACTIVE: "Conversando",
  WAITING_REPLY: "Aguardando resposta",
  POSSIBLE_DATE: "Possível date",
  DATE_SCHEDULED: "Date marcado",
  DATE_COMPLETED: "Date realizado",
  ARCHIVED: "Arquivado",
};

export type Message = {
  id: string;
  author: "me" | "them";
  text: string;
  time: string;
};

export type Memory = {
  nome: string;
  idade: number;
  trabalho: string;
  cidade: string;
  interesses: string[];
  assuntos: string[];
  importantes: string[];
};

export type Analysis = {
  interesse: "Baixo" | "Médio" | "Alto";
  ultimaInteracao: string;
  proximoObjetivo: string;
  possivelDate: boolean;
  sugestao: string;
  perguntasAbertas: string[];
};

export type Match = {
  id: string;
  nome: string;
  idade: number;
  foto: string;
  status: ConversationStatus;
  ultimaMensagem: string;
  horario: string;
  plataforma: string;
  mensagens: Message[];
  memoria: Memory;
  analise: Analysis;
  sugestaoIA: string;
  aguardandoAprovacao: boolean;
};

export const matches: Match[] = [
  {
    id: "ana",
    nome: "Ana",
    idade: 24,
    foto: ana,
    status: "ACTIVE",
    ultimaMensagem: "Você: que tal um café amanhã?",
    horario: "12:04",
    plataforma: "Messaging Integration",
    aguardandoAprovacao: true,
    mensagens: [
      { id: "1", author: "them", text: "Oi! Vi que você também curte fotografia", time: "10:12" },
      { id: "2", author: "me", text: "Curto sim, principalmente analógica. Você fotografa?", time: "10:20" },
      { id: "3", author: "them", text: "Faço uns ensaios nos fins de semana, mais no digital", time: "10:31" },
      { id: "4", author: "me", text: "Que legal. Tem algum lugar favorito pra fotografar aqui?", time: "11:02" },
      { id: "5", author: "them", text: "Adoro o centro velho de manhã cedo, a luz é ótima", time: "11:48" },
      { id: "6", author: "me", text: "Que tal um café amanhã?", time: "12:04" },
    ],
    memoria: {
      nome: "Ana",
      idade: 24,
      trabalho: "Designer de produto",
      cidade: "São Paulo",
      interesses: ["Fotografia", "Café especial", "Cinema"],
      assuntos: ["Fotografia analógica", "Centro velho", "Trabalho dela"],
      importantes: ["Acorda cedo nos fins de semana", "Não bebe álcool"],
    },
    analise: {
      interesse: "Alto",
      ultimaInteracao: "há 12 minutos",
      proximoObjetivo: "Confirmar dia e horário do café",
      possivelDate: false,
      sugestao: "A conversa está fluindo bem. Sugerir um horário concreto tende a ajudar.",
      perguntasAbertas: ["Ela ainda não respondeu sobre o café de amanhã"],
    },
    sugestaoIA: "Perfeito, então é um café às 10h no caminho. Me diz se rola!",
  },
  {
    id: "julia",
    nome: "Julia",
    idade: 23,
    foto: julia,
    status: "WAITING_REPLY",
    ultimaMensagem: "Ela: você disse que ia viajar?",
    horario: "08:41",
    plataforma: "Messaging Integration",
    aguardandoAprovacao: true,
    mensagens: [
      { id: "1", author: "them", text: "Bom dia! Como foi a semana?", time: "08:20" },
      { id: "2", author: "me", text: "Corrida, mas boa. E a sua?", time: "08:33" },
      { id: "3", author: "them", text: "Tranquila. Você disse que ia viajar?", time: "08:41" },
    ],
    memoria: {
      nome: "Julia",
      idade: 23,
      trabalho: "Estudante de arquitetura",
      cidade: "Campinas",
      interesses: ["Viagens", "Música ao vivo", "Corrida"],
      assuntos: ["Rotina da semana", "Viagem para a serra"],
      importantes: ["Faz estágio à tarde", "Prefere conversar de manhã"],
    },
    analise: {
      interesse: "Médio",
      ultimaInteracao: "há 4 horas",
      proximoObjetivo: "Responder a pergunta em aberto e propor assunto novo",
      possivelDate: false,
      sugestao: "Há uma pergunta sem resposta. Responder direto costuma destravar a conversa.",
      perguntasAbertas: ["Você disse que ia viajar?"],
    },
    sugestaoIA: "Vou sim, pra serra no fim do mês. Você já conheceu por lá?",
  },
  {
    id: "marina",
    nome: "Marina",
    idade: 25,
    foto: marina,
    status: "POSSIBLE_DATE",
    ultimaMensagem: "Ela: to livre sexta, topa?",
    horario: "14:02",
    plataforma: "Messaging Integration",
    aguardandoAprovacao: true,
    mensagens: [
      { id: "1", author: "them", text: "Adorei esse lugar que você falou", time: "13:40" },
      { id: "2", author: "me", text: "É ótimo mesmo, o café de lá é sério", time: "13:52" },
      { id: "3", author: "them", text: "To livre sexta, topa?", time: "14:02" },
    ],
    memoria: {
      nome: "Marina",
      idade: 25,
      trabalho: "Fisioterapeuta",
      cidade: "São Paulo",
      interesses: ["Trilhas", "Café", "Vinho"],
      assuntos: ["Cafeterias", "Trilhas no fim de semana"],
      importantes: ["Trabalha até 18h", "Mora na zona oeste"],
    },
    analise: {
      interesse: "Alto",
      ultimaInteracao: "há 20 minutos",
      proximoObjetivo: "Confirmar data, horário e local",
      possivelDate: true,
      sugestao: "A mensagem sugere disponibilidade para um encontro. Vale propor algo concreto.",
      perguntasAbertas: ["To livre sexta, topa?"],
    },
    sugestaoIA: "Topo sim. Sexta às 19h naquele café da Aurora, pode ser?",
  },
  {
    id: "carolina",
    nome: "Carolina",
    idade: 24,
    foto: carolina,
    status: "DATE_SCHEDULED",
    ultimaMensagem: "Você: combinado, sábado 20h",
    horario: "Ontem",
    plataforma: "Messaging Integration",
    aguardandoAprovacao: false,
    mensagens: [
      { id: "1", author: "them", text: "Sábado funciona melhor pra mim", time: "19:10" },
      { id: "2", author: "me", text: "Combinado, sábado 20h", time: "19:22" },
    ],
    memoria: {
      nome: "Carolina",
      idade: 24,
      trabalho: "Advogada",
      cidade: "São Paulo",
      interesses: ["Teatro", "Culinária japonesa", "Livros"],
      assuntos: ["Restaurantes", "Agenda da semana"],
      importantes: ["Alérgica a frutos do mar"],
    },
    analise: {
      interesse: "Alto",
      ultimaInteracao: "ontem",
      proximoObjetivo: "Confirmar no dia e enviar o endereço",
      possivelDate: false,
      sugestao: "Date já marcado. Uma confirmação leve no dia costuma reduzir cancelamentos.",
      perguntasAbertas: [],
    },
    sugestaoIA: "Tudo certo pra sábado? Te mando o endereço mais cedo.",
  },
];

export const estilosIA = [
  "Natural",
  "Casual",
  "Engraçado",
  "Confiante",
  "Flertando",
  "Direto",
  "Curto",
] as const;

export const modosIA = ["Manual", "Aprovação", "Automático"] as const;

export const followUpOpcoes = ["1 hora", "3 horas", "Amanhã", "Data personalizada"] as const;

export type DateEvent = {
  id: string;
  matchId: string;
  nome: string;
  foto: string;
  data: string;
  diaSemana: string;
  horario: string;
  local: string;
  observacoes: string;
  confirmado: boolean;
};

export const dateEvents: DateEvent[] = [
  {
    id: "d1",
    matchId: "carolina",
    nome: "Carolina, 24",
    foto: carolina,
    data: "Sábado, 3 de outubro",
    diaSemana: "Sáb",
    horario: "20:00",
    local: "Izakaya Aurora, Pinheiros",
    observacoes: "Alérgica a frutos do mar. Reservar mesa no salão.",
    confirmado: true,
  },
  {
    id: "d2",
    matchId: "marina",
    nome: "Marina, 25",
    foto: marina,
    data: "Sexta, 2 de outubro",
    diaSemana: "Sex",
    horario: "19:00",
    local: "Café da Aurora (a confirmar)",
    observacoes: "Ela sugeriu sexta. Falta confirmar horário.",
    confirmado: false,
  },
];

export const dashboardStats = [
  { label: "Matches ativos", value: 12, accent: false },
  { label: "Em andamento", value: 8, accent: false },
  { label: "Aguardando resposta", value: 3, accent: false },
  { label: "Possíveis dates", value: 2, accent: true },
  { label: "Dates marcados", value: 1, accent: false },
  { label: "Aguardando aprovação", value: 3, accent: false },
];

export const detectionPhrases = ["marcar", "disponível", "livre", "sair", "café", "date", "encontro"];

export function detectaDate(texto: string) {
  const t = texto.toLowerCase();
  return detectionPhrases.some((p) => t.includes(p));
}
