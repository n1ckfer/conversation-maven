# Conversation Compass

{

  "project": "Dating Conversation Management Dashboard",

  "type": "web_application",

  "objective": "Criar um site web responsivo para gerenciar matches, conversas, sugestões de respostas por IA, detecção de possíveis dates e agenda.",

  "important": [

    "Não criar um clone do Tinder.",

    "Não criar APK ou aplicativo mobile nativo.",

    "Criar somente um site web responsivo.",

    "Nesta primeira versão usar dados mockados.",

    "Preparar a arquitetura para integrações futuras."

  ],

  "main_flow": [

    "MATCH",

    "CONVERSA",

    "IA ANALISA",

    "IA SUGERE RESPOSTA",

    "USUÁRIO EDITA OU APROVA",

    "RESPOSTA É ENVIADA",

    "CONVERSA CONTINUA",

    "POSSÍVEL DATE",

    "AGENDAMENTO",

    "AGENDA"

  ],

  "pages": [

    "Dashboard",

    "Matches",

    "Conversas",

    "Dates",

    "Agenda",

    "IA",

    "Configurações"

  ],

  "dashboard": {

    "cards": [

      "Matches ativos",

      "Conversas aguardando resposta",

      "Conversas em andamento",

      "Possíveis dates",

      "Dates marcados",

      "Mensagens aguardando aprovação"

    ],

    "attention_section": true

  },

  "matches": {

    "fields": [

      "Foto",

      "Nome",

      "Idade",

      "Status",

      "Última mensagem",

      "Horário",

      "Indicador de possível date"

    ],

    "filters": [

      "Todos",

      "Novos",

      "Conversando",

      "Aguardando resposta",

      "Possível date",

      "Date marcado",

      "Arquivados"

    ],

    "search": true

  },

  "conversation": {

    "layout": {

      "left": "Lista de conversas",

      "center": "Chat",

      "right": "Informações da pessoa e análise da IA"

    },

    "features": [

      "Histórico completo",

      "Campo de mensagem",

      "Enviar",

      "Gerar resposta",

      "Editar resposta",

      "Aprovar e enviar",

      "Regenerar resposta"

    ]

  },

  "ai": {

    "analyze": [

      "Histórico da conversa",

      "Últimas mensagens",

      "Contexto",

      "Tom da pessoa",

      "Assuntos já discutidos",

      "Perguntas ainda não respondidas",

      "Informações já descobertas",

      "Possibilidade de encontro"

    ],

    "response_requirements": [

      "Natural",

      "Contextualizada",

      "Não repetitiva",

      "Não contradizer o histórico",

      "Não repetir perguntas",

      "Evitar mensagens longas",

      "Evitar linguagem robótica",

      "Evitar excesso de emojis"

    ],

    "styles": [

      "Natural",

      "Casual",

      "Engraçado",

      "Confiante",

      "Flertando",

      "Direto",

      "Curto"

    ],

    "modes": [

      "Manual",

      "Aprovação",

      "Automático"

    ],

    "automatic_mode": "Somente quando habilitado e permitido pela integração utilizada."

  },

  "conversation_memory": {

    "enabled": true,

    "fields": [

      "Nome",

      "Idade",

      "Trabalho",

      "Cidade",

      "Interesses",

      "Assuntos discutidos",

      "Informações importantes"

    ],

    "editable": true

  },

  "conversation_analysis": {

    "show": [

      "Status",

      "Interesse aparente",

      "Última interação",

      "Próximo objetivo sugerido",

      "Possível date",

      "Sugestão da IA"

    ],

    "important": "A análise deve ser apresentada como sugestão e não como certeza sobre os sentimentos da pessoa."

  },

  "date_detection": {

    "detect_phrases_related_to": [

      "Marcar encontro",

      "Disponibilidade",

      "Sair",

      "Café",

      "Date"

    ],

    "show_alert": "Possível date",

    "form": [

      "Pessoa",

      "Data",

      "Horário",

      "Local",

      "Observações"

    ],

    "action": "Adicionar à agenda"

  },

  "calendar": {

    "views": [

      "Dia",

      "Semana",

      "Mês"

    ],

    "event_fields": [

      "Nome",

      "Foto",

      "Data",

      "Horário",

      "Local",

      "Observações",

      "Link para conversa"

    ],

    "actions": [

      "Editar",

      "Cancelar",

      "Abrir conversa"

    ],

    "google_calendar": true

  },

  "follow_up": {

    "enabled": true,

    "options": [

      "1 hora",

      "3 horas",

      "Amanhã",

      "Data personalizada"

    ]

  },

  "conversation_status": [

    "NEW",

    "ACTIVE",

    "WAITING_REPLY",

    "POSSIBLE_DATE",

    "DATE_SCHEDULED",

    "DATE_COMPLETED",

    "ARCHIVED"

  ],

  "messaging_integration": {

    "name": "Messaging Integration",

    "future_ready": true,

    "use_official_apis": true,

    "initial_data": "Mock",

    "do_not_implement": [

      "Scraping",

      "Bypass de CAPTCHA",

      "Roubo de sessão",

      "Obtenção de cookies",

      "Contorno de proteções ou limitações de plataformas"

    ]

  },

  "database": {

    "tables": [

      "users",

      "matches",

      "conversations",

      "messages",

      "conversation_memory",

      "ai_suggestions",

      "dates",

      "calendar_events",

      "follow_ups",

      "ai_settings",

      "integrations"

    ]

  },

  "technology": {

    "frontend": [

      "React",

      "TypeScript",

      "Tailwind CSS"

    ],

    "backend": "Supabase",

    "database": "PostgreSQL",

    "authentication": "Supabase Auth",

    "realtime": "Supabase Realtime",

    "calendar": "Google Calendar OAuth",

    "ai": "Arquitetura preparada para API de LLM"

  },

  "security": [

    "Cada usuário deve acessar somente seus próprios dados.",

    "Usar Row Level Security no Supabase.",

    "Nunca expor chaves de API no frontend.",

    "Usar OAuth nas integrações externas quando aplicável."

  ],

  "design": {

    "style": [

      "Moderno",

      "Premium",

      "Minimalista",

      "Profissional",

      "Responsivo"

    ],

    "reference": "Dashboard SaaS moderno",

    "avoid": "Visual de clone do Tinder",

    "features": [

      "Cards discretos",

      "Bordas arredondadas",

      "Tipografia moderna",

      "Boa hierarquia visual",

      "Microanimações",

      "Ícones simples",

      "Dark mode opcional"

    ]

  },

  "demo_data": [

    {

      "name": "Ana",

      "age": 24,

      "status": "ACTIVE"

    },

    {

      "name": "Julia",

      "age": 23,

      "status": "WAITING_REPLY"

    },

    {

      "name": "Marina",

      "age": 25,

      "status": "POSSIBLE_DATE"

    },

    {

      "name": "Carolina",

      "age": 24,

      "status": "DATE_SCHEDULED"

    }

  ],

  "first_phase": "Construir a interface completa com dados mockados. Não implementar integrações reais, APIs ou automação externa nesta primeira fase."

}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0f72368-297a-42bd-9974-65a64f7d1e24).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
