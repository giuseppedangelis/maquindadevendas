# 📘 Manual de Padrões Frontend (AI & Developer Guide)

> **Contexto:** Este documento serve como **GOLDEN SOURCE** (verdade absoluta) para agentes de IA e desenvolvedores que atuarão na construção e evolução deste sistema. O objetivo é manter consistência, escalabilidade e qualidade de código, considerando que o sistema atende plataformas **WEB e MOBILE**.

---

## 1. 🛠️ Tech Stack Principal

Estas são as tecnologias mandatórias. Não desvie desta stack sem aprovação explícita.

| Categoria | Tecnologia | Versão (Ref) | Justificativa |
|-----------|------------|--------------|---------------|
| **Core** | React + TypeScript | 18+ / 5+ | Padrão de mercado, tipagem forte evita erros em escalas maiores. |
| **Build** | Vite | 5+ | Performance e DX superior. |
| **Estilização** | Tailwind CSS | 3.4+ | Utility-first, essencial para responsividade rápida. |
| **UI Kit** | Shadcn/UI (Radix) | Latest | Acessível, customizável, código fonte no projeto (não é caixa preta). |
| **Forms** | React Hook Form + Zod | Latest | Gestão de estado de formulário perfomático + validação robusta. |
| **Data Fetch** | Tanstack Query | Latest | Gerenciamento de estado de servidor (cache, retry, loading). |
| **Icons** | Lucide React | Latest | Leve e consistente com Shadcn default. |

---

## 2. 📱 Estratégia Mobile & Responsividade

O sistema deve ser desenhado pensando em **Mobile-First**. Como o sistema será acessado via celular, a usabilidade em telas pequenas não é opcional, é prioritária.

### Regras para o Agente:
1.  **Mobile-First CSS**: Escreva sempre o estilo base para mobile e use breakpoints (`md:`, `lg:`) para telas maiores.
    *   ❌ `w-1/2 sm:w-full` (Errado: Desktop-first)
    *   ✅ `w-full md:w-1/2` (Correto: Mobile-first)
2.  **Touch Targets**: Botões e inputs devem ter tamanho mínimo tocável (min 44px de altura) em mobile.
3.  **Layouts Flexíveis**: Evite larguras fixas (`width: 500px`). Use porcentagens ou larguras relativas (`w-full`, `max-w-md`).
4.  **Componentes Drawer vs Modal**:
    *   Em **Desktop**, use `Dialog` (Modal).
    *   Em **Mobile**, prefira `Drawer` (Sheet) que vem de baixo para cima, pois é mais nativo e ergonômico.
5.  **Navigation**: Para mobile, utilize Menu Hambúrguer ou Bottom Tab Bar se o app tiver complexidade de navegação.

---

## 3. 🏗️ Estrutura de Diretórios e Arquivos

Mantenha a organização limpa para que o contexto seja facilmente carregado.

```bash
src/
├── components/
│   ├── ui/               # 🛑 PROIBIDO EDITAR LÓGICA AQUI. Apenas estilos visuais dos componentes base Shadcn.
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── shared/           # Componentes reutilizáveis globais (ex: Header, Footer, Cards genéricos).
│   └── [feature]/        # (Opcional) Componentes específicos de uma funcionalidade complexa.
├── hooks/                # Custom hooks (useAuth, useMobile, etc).
├── lib/
│   └── utils.ts          # Utilitários globais (função cn() obrigatória para merge de classes).
├── pages/                # Páginas da aplicação (Roteamento).
├── services/             # Camada de API (Axios/Fetch wrappers).
└── types/                # Definições de tipos globais TypeScript.
```

---

## 4. 🧩 Diretrizes de Desenvolvimento de Componentes

### 4.1. Definição de Componentes
*   Use **PascalCase** para nomes de arquivos e componentes (`UserProfile.tsx`).
*   Exports nomeados são preferidos (`export function UserProfile`).
*   Sempre tipe as props explicitamente.

```tsx
// ✅ Bom Exemplo
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded", 
        variant === 'primary' && "bg-blue-500",
        className // Permite override via Tailwind
      )} 
      {...props} 
    />
  );
}
```

### 4.2. Estilização com Tailwind
*   Use a função `cn()` (classnames + tw-merge) para combinar classes, garantindo que props passadas sobrescrevam os estilos padrão.
*   Evite `@apply` no CSS, prefira classes utilitárias no HTML para manter a "Locality of Behavior".

### 4.3. Tratamento de Dados (React Query)
*   Não use `useEffect` para buscar dados. Use `useQuery`.
*   Não use `useState` para armazenar dados da API a menos que precise transformá-los. O cache do React Query é o "estado".

---

## 5. 🛡️ Inputs e Formulários

Para garantir a integridade dos dados, siga este padrão RIGOROSAMENTE:

1.  **Schema primeiro**: Defina o schema de validação com **Zod**.
2.  **Hook Form**: Use `useForm` inferindo o tipo do Zod.
3.  **Componentes Controlados**: Use os componentes de `Form`, `FormControl`, `FormField` do Shadcn para integração automática de mensagens de erro e acessibilidade.

```tsx
// Exemplo de padrão
const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

// Ao criar o form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});
```

---

## 6. 🤖 Instruções Específicas para Agentes

Ao solicitar código para uma nova feature:
1.  **Analise**: Verifique se já existe um componente UI no Shadcn (`src/components/ui`) que atenda a necessidade antes de criar um do zero.
2.  **Consistência**: Mantenha o padrão de importação (`@/components/ui/...`).
3.  **Responsividade**: Sempre pergunte ou assuma "Como isso se comporta no mobile?" e adicione as classes apropriadas.
4.  **Minimalismo**: Não adicione bibliotecas novas (npm install) a menos que absolutamente necessário. Use o que já existe no `package.json`.

---
*Documento Gerado em: 21/01/2026*
