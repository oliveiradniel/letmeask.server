import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined!');
}

const pool = new Pool({ connectionString });

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const rooms = [
  {
    name: 'React Hooks na prática',
    description:
      'Sala dedicada a dúvidas e discussões sobre os hooks do React, incluindo useState, useEffect, useRef, useMemo e hooks customizados.',
  },
  {
    name: 'Gerenciamento de estado com React',
    description:
      'Discussões sobre as diferentes abordagens de estado no React: Context API, Zustand, Redux Toolkit e React Query.',
  },
  {
    name: 'React performance e otimização',
    description:
      'Como evitar re-renders desnecessários, usar React.memo, lazy loading, code splitting e outras técnicas de performance.',
  },
  {
    name: 'NestJS fundamentos e arquitetura',
    description:
      'Sala para dúvidas sobre os conceitos core do NestJS: módulos, controllers, services, providers e injeção de dependência.',
  },
  {
    name: 'NestJS avançado: Guards, Pipes e Interceptors',
    description:
      'Como usar os building blocks avançados do NestJS para validação, autenticação, transformação de dados e logging.',
  },
];

const questionsByRoom: Record<string, { question: string; answer: string }[]> =
  {
    'React Hooks na prática': [
      {
        question: 'Qual a diferença entre useMemo e useCallback?',
        answer:
          'useMemo memoriza o resultado de uma função (um valor calculado), enquanto useCallback memoriza a própria função. Use useMemo quando o custo é computar um valor derivado, e useCallback quando você precisa passar uma função estável como prop para um componente filho que usa React.memo ou como dependência de um useEffect.',
      },
      {
        question:
          'Por que meu useEffect roda em loop infinito quando coloco um objeto no array de dependências?',
        answer:
          'Porque objetos são comparados por referência em JavaScript. A cada re-render, o objeto é recriado em um novo endereço de memória, então o React entende que a dependência mudou e chama o efeito novamente, que causa outro render, e assim por diante. A solução é memoizar o objeto com useMemo ou desestruturar as propriedades primitivas que você realmente precisa como dependências.',
      },
      {
        question: 'Quando devo criar um hook customizado?',
        answer:
          'Sempre que você perceber que está repetindo a mesma lógica de estado e efeitos em mais de um componente. Hooks customizados são simplesmente funções que encapsulam chamadas a outros hooks do React. Eles não criam compartilhamento de estado, apenas reutilização de lógica. Exemplos clássicos: useFetch, useDebounce, useLocalStorage.',
      },
    ],
    'Gerenciamento de estado com React': [
      {
        question: 'Quando vale a pena usar Zustand no lugar da Context API?',
        answer:
          'A Context API funciona bem para estados que mudam raramente, como tema ou usuário autenticado, pois qualquer mudança re-renderiza todos os consumidores do contexto. O Zustand usa um modelo de subscription seletiva, ou seja, o componente só re-renderiza quando o slice de estado que ele selecionou muda. Use Zustand quando o estado muda com frequência ou quando você tem muitos componentes consumindo diferentes partes do estado global.',
      },
      {
        question:
          'O React Query substitui o Redux para gerenciar estado de servidor?',
        answer:
          'Sim, para a maioria dos casos. O Redux foi muito usado para cachear dados do servidor, mas esse não é seu propósito principal. O React Query (TanStack Query) foi construído especificamente para isso: caching, sincronização, refetching automático, optimistic updates e tratamento de loading/error. Use React Query para estado de servidor e Zustand ou Context API para estado de UI.',
      },
      {
        question:
          'Como compartilhar estado entre componentes sem prop drilling?',
        answer:
          'Existem algumas abordagens. Se os componentes são próximos na árvore, tente elevar o estado ao ancestral comum (state lifting). Se estão distantes, use Context API para estados simples e pouco frequentes. Para estados mais complexos ou performáticos, use uma biblioteca como Zustand. Em alguns casos, reorganizar a composição de componentes resolve o problema sem precisar de nenhuma solução de estado global.',
      },
    ],
    'React performance e otimização': [
      {
        question:
          'Como identificar quais componentes estão re-renderizando desnecessariamente?',
        answer:
          'A forma mais prática é usar o React DevTools com o Profiler ativado. Ele mostra quais componentes renderizaram, o tempo de cada render e o motivo. Outra opção é adicionar a extensão "Highlight updates" no React DevTools, que destaca visualmente os componentes que re-renderizaram. Depois de identificar os componentes problemáticos, você analisa se o problema é uma referência instável de props, estado compartilhado ou contexto.',
      },
      {
        question: 'React.memo sempre melhora a performance?',
        answer:
          'Não. O React.memo evita re-renders comparando as props, mas essa comparação tem um custo. Se as props mudam quase sempre, você paga o custo da comparação sem ganhar nada. Ele é mais eficaz em componentes que recebem poucas props, que são computacionalmente pesados para renderizar, e cujo pai re-renderiza com frequência por razões não relacionadas ao filho. Não aplique React.memo indiscriminadamente.',
      },
      {
        question: 'O que é code splitting e como implementar no React?',
        answer:
          "Code splitting é a prática de dividir o bundle da aplicação em pedaços menores que são carregados sob demanda, reduzindo o tempo de carregamento inicial. No React, você implementa com React.lazy e Suspense. O caso mais comum é no nível de rotas: cada página vira um import dinâmico (import('./pages/Dashboard')) que só é baixado quando o usuário navega para aquela rota.",
      },
    ],
    'NestJS fundamentos e arquitetura': [
      {
        question: 'Qual a diferença entre um Service e um Provider no NestJS?',
        answer:
          'Todo Service é um Provider, mas nem todo Provider é um Service. Um Provider é qualquer classe decorada com @Injectable() que o sistema de injeção de dependência do NestJS consegue instanciar e injetar. Services são o tipo mais comum de provider, usados para encapsular a lógica de negócio. Outros tipos de providers incluem repositórios, factories, helpers e valores simples registrados como useValue.',
      },
      {
        question:
          'Para que serve o forRoot e o forRootAsync nos módulos do NestJS?',
        answer:
          'Esses são padrões para módulos configuráveis. O forRoot recebe configurações estáticas e retorna um DynamicModule com os providers já configurados, ideal para quando as configs são conhecidas em tempo de build. O forRootAsync é usado quando as configurações dependem de algo assíncrono, como variáveis de ambiente carregadas pelo ConfigService. Você vê esse padrão em TypeOrmModule.forRootAsync, BullModule.forRootAsync, etc.',
      },
      {
        question: 'Como organizar os módulos em uma aplicação NestJS grande?',
        answer:
          'A abordagem mais comum é separar por domínio ou feature: cada domínio tem seu próprio módulo (UsersModule, AuthModule, OrdersModule). Dentro de cada módulo ficam os controllers, services e repositórios relacionados a aquele domínio. Módulos compartilhados (como DatabaseModule ou ConfigModule) ficam em uma pasta shared ou common e são importados pelos demais. Evite criar um módulo gigante com tudo dentro.',
      },
    ],
    'NestJS avançado: Guards, Pipes e Interceptors': [
      {
        question:
          'Qual a ordem de execução de Guards, Pipes e Interceptors no NestJS?',
        answer:
          'A ordem é: Middleware → Guards → Interceptors (antes do handler) → Pipes → Handler (seu método no controller) → Interceptors (depois do handler) → Exception Filters. Guards decidem se a request pode prosseguir. Pipes transformam e validam os dados. Interceptors envolvem o handler inteiro, podendo modificar tanto a request quanto a response.',
      },
      {
        question: 'Como usar o ValidationPipe globalmente com class-validator?',
        answer:
          "No main.ts, chame app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })). O whitelist: true remove automaticamente propriedades não decoradas no DTO. O transform: true converte os tipos automaticamente, por exemplo transformando uma string '1' vinda da query string em número se o DTO espera um number. Instale class-validator e class-transformer como dependências.",
      },
      {
        question: 'Quando usar um Interceptor no lugar de um Middleware?',
        answer:
          'Middleware roda antes do roteamento e não tem acesso ao contexto de execução do NestJS, então ele não sabe qual handler vai ser chamado. Interceptors rodam depois do roteamento e têm acesso ao ExecutionContext, podendo saber o controller e o método alvo. Use Middleware para coisas agnósticas à rota, como logging de request ou parsing. Use Interceptors quando você precisa de acesso ao contexto ou quer modificar a resposta, como para serialização ou caching.',
      },
    ],
  };

async function main() {
  await prisma.question.deleteMany();
  await prisma.room.deleteMany();

  for (const room of rooms) {
    const createdRoom = await prisma.room.create({ data: room });

    const questions = questionsByRoom[room.name];

    if (questions) {
      await prisma.question.createMany({
        data: questions.map((q) => ({ ...q, roomId: createdRoom.id })),
      });
    }
  }
}

main()
  .then(() => console.log('Successfully executed seed'))
  .catch((error) => {
    console.log(error);
    console.log('Error while executing seed');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
