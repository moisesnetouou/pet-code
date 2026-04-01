# Padrões do Projeto PetCode

Este documento define os padrões e convenções usados no projeto PetCode para garantir consistência e qualidade no código.

## 1. Nomenclatura de Arquivos e Pastas

### Pastas de Componentes

Usar **kebab-case** (minúsculas com hífen):

```
recent-pets/       ✅
NextAppointment/  ❌
welcome-banner/    ✅
WelcomeBanner/    ❌
```

### Arquivos dentro da pasta

Cada componente segue a estrutura:

```
component-name/
├── index.tsx    # Componente React
├── styles.ts    # tailwind-variants com slots
└── types.ts     # Tipagens específicas do componente
```

## 2. tailwind-variants

Sempre usar **slots** para organizar estilos, nunca classes diretas no componente.

### Estrutura correta

```typescript
import { tv } from 'tailwind-variants'

export const componentStyles = tv({
  slots: {
    container: 'classes base do container',
    title: 'classes base do titulo',
    button: 'classes base do botao',
  },
  variants: {
    variant: {
      primary: { button: 'bg-blue-500 text-white' },
      secondary: { button: 'bg-slate-200 text-slate-700' },
    },
    size: {
      sm: { button: 'px-3 py-1 text-sm' },
      lg: { button: 'px-6 py-3 text-lg' },
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
```

### Uso no componente

```typescript
export function Component({ variant = 'primary' }: ComponentProps) {
  const s = componentStyles({ variant })

  return (
    <div className={s.container()}>
      <h1 className={s.title()}>Título</h1>
      <button className={s.button()}>Clique</button>
    </div>
  )
}
```

## 3. Estrutura de Módulo (pasta com page.tsx)

Cada módulo (ex: dashboard, users, settings) segue:

```
module-name/
├── page.tsx              # Página principal (apenas composição)
├── types.ts              # Tipagens globais do módulo
├── data.ts               # Dados mock
├── utils/
│   └── function.ts      # Funções utilitárias
└── components/
    └── component-name/
        ├── index.tsx
        ├── styles.ts
        └── types.ts
```

## 4. Tipagens

### Tipagens globais

Arquivo: `types.ts` na raiz do módulo.

```typescript
export interface Pet {
  id: number
  name: string
  type: string
}

export interface Appointment {
  id: number
  pet: Pet
  status: 'agendado' | 'confirmado' | 'cancelado'
}
```

### Tipagens de componente

Arquivo: `types.ts` dentro da pasta do componente.

```typescript
export interface ComponentProps {
  title?: string
  variant?: 'primary' | 'secondary'
}
```

## 5. Dados Mock

Arquivo: `data.ts` na raiz do módulo.

```typescript
export const pets: Pet[] = [
  { id: 1, name: 'Cheems', type: 'Cachorro' },
]
```

## 6. Comentários

**Não adicionar comentários** no código a menos que seja estritamente necessário para explicar lógica de negócio complexa.

## 7. Componentização

Componentizar quando:

- O componente é reutilizável em mais de um lugar
- O componente tem mais de 30 linhas
- O componente tem estilos complexos (mais de 5 classes)

Manter no arquivo principal quando:

- É algo único da página
- É muito simples (menos de 20 linhas)

## 8. Imports

### Imports de componentes

```typescript
import { ComponentName } from './components/component-name'
```

### Imports de módulos externos

```typescript
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

## 9. Styled Components vs Inline Styles

Sempre usar **tailwind-variants** com Tailwind CSS. Não usar:

- styled-components
- emotion
- inline styles (exceto para valores dinâmicos simples)

## 10. ESLint e Prettier

O projeto usa:

- Biome.js para linting
- Tailwind CSS para estilos

Execute `npm run lint` antes de commitar.

## 11. Cores e Contraste

Para garantir boa acessibilidade e visual, sempre use cores com contraste adequado.

### Paleta de Cores para Botões

| Uso | Background | Texto | Quando usar |
|-----|------------|-------|-------------|
| Primário | `bg-teal-500 hover:bg-teal-600` | `text-white` | Ações principais (Salvar, Confirmar) |
| Secundário | `bg-slate-100 hover:bg-slate-200` | `text-slate-700 hover:text-slate-800` | Ações secundárias (Cancelar, Voltar) |
| Perigo | `bg-red-500 hover:bg-red-600` | `text-white` | Ações destructive (Excluir) |
| Outline | `border border-slate-200 hover:bg-slate-100` | `text-slate-700 hover:text-slate-800` | Alternativas a secundário |

### Cores de Texto

| Nível | Cor | Quando usar |
|-------|-----|-------------|
| Primário | `text-slate-800` ou `text-slate-900` | Títulos, nomes |
| Secundário | `text-slate-700` | Texto de corpo |
| Terciário | `text-slate-600` | Labels, textos auxiliares |
| Quarto | `text-slate-500` | Placeholders, ícones |

**Nunca use**:
- `text-slate-400` ou mais claro para texto principal
- `text-slate-500` para labels (use `text-slate-600` ou mais escuro)
- Cores com sufixo `-50` para backgrounds de botões (use `-100`, `-200`)

### Cores de Badges e Status

| Status | Background | Texto |
|--------|------------|-------|
| Sucesso/Ativo | `bg-emerald-100` | `text-emerald-800` |
| Alerta/Pendente | `bg-amber-100` | `text-amber-800` |
| Erro/Inativo | `bg-red-100` | `text-red-800` |
| Info | `bg-blue-100` | `text-blue-800` |

### Inputs e Formulários

| Elemento | Cor Recomendada | Evitar |
|----------|-----------------|--------|
| Input BG | `bg-white` | `bg-slate-50` (muito claro) |
| Input text | `text-slate-800` | `text-slate-600` |
| Input border | `border-slate-200` | `border-slate-100` |
| Label | `text-slate-700` ou `text-slate-600` | `text-slate-500` |
| Placeholder | `text-slate-400` | cores mais claras |

### Exemplos de Uso

```typescript
// Botão primário
<Button className="bg-teal-500 hover:bg-teal-600 text-white">
  Salvar
</Button>

// Botão secundário
<Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-100">
  Cancelar
</Button>

// Badge de sucesso
<span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
  Ativo
</span>

// Label de formulário
<label className="text-sm font-medium text-slate-700">
  Nome
</label>

// Input
<Input className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400" />
```
