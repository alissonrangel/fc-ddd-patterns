
# DDD: Modelagem Tática e Patterns

## Introdução
### Introdução
- tendo os elementos estratégicos definidos, você vai para a parte tática
- não começa fazendo a parte tática

### Resignificando conceitos
- 

### Elementos táticos

#### Elementos táticos
- vão nos ajudar a resolver os problemas dentro dos contextos delimitados
- olhar mais afundo o bounded contexts
- slide
  - em DDD, precisa olhar mais afundo um bounded context

## Código fonte
- https://github.com/devfullcycle/fc-ddd-patterns
- https://github.com/alissonrangel/fc-ddd-patterns

## Entidades
### Entidades
#### Entities
- slide1
  - é algo único que é capaz ser alterado de forma contínua durante um longo período de tempo
- slide2
  - pode ser distinguida independente de seus atributos
- slide3
  - entidade = identidade

### Configurando projeto typescript
- baixando o projeto do github
- https://github.com/alissonrangel/fc-ddd-patterns

### Criando entidade anêmica
- src/domain/entity/customer.ts

### Regras de negócio
- O que  a entidade tem de comportamento?
- motivos para mudança -> inserir regras ne negócio
- o estado atual da minha entidade deve estar sempre correto

### Consistência constante em primeiro lugar
- No DDD, A entidade sempre vai ter que representar o estado correto e atual do elemento

### Princípio da autovalidação
- dados têm que estar consistentes a todo o momento
  - como garantir isso?
  - uma entidade por padrão, ela sempre vai ter que se autovalidar


### Entidade vs ORM
/**
 * Duas entidades:
 * - `entidade focada em persistência` - complexidade acidental
 * - `entidade focada em negócio` - complexidade  de negócio
 */

## Value Objects

