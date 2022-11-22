
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
 * - `entidade focada em negócio` - complexidade de negócio -> Foco do DDD está aqui
 */

Complexidade de negócio
Domain
  - Entity
  - - customer.ts (regra de negócio)

Complexidade acidental
Infra -> fala com o mundo externo
  - Entity / Model
  - - customer.ts (get, set)

## Value Objects - VOs
### Introdução aos objetos de valor
- Como deixar o código mais expressiva
- Modelar de forma mais rica possível, mais expressiva
- 

### Entendendo Value Objects
#### Value Objects
- Me preocupo apenas com os atributos de um elemento de um model
- Não me preocupo com o comportamento, mas apenas com os seus atributos
- Tratá-lo como imutável, ele é trocado, não faço alteração, mudo um conjunto de dados
  - Address, não precisa de um id,
- Quanto mais prafora ele estiver mais instável será
- Quanto mais no miolo, mais estável ele é. O coração não muda. Para deixar algo estável, dou expressividade, evitar de trabalhar com tipos primitivos e usar meus tipos.
- slide1
- slide2
  - Regras
    - sempre tem que estar se autovalidando
    - não tem id
    - ele é imutável

### Value Objects na prática
- modelagem de persistência é outra coisa

## Agregados
### Introdução aos agregados
- Uma entidade está totalmente relacionada com o objeto de valor
- Address não vive sem o customer
- 

### Entendendo Agregados
#### Aggregate
- é um conj de objetos associados que tratamos como uma unidade para propósito de mudança de dados
- Aquele conj de objetos, um não vive sem o outro, vou pensar em quais agregados eu vou ter e não entidades
- slide
#### slide

### Agregados na prática

## Avançando com testes
### Introdução aos testes automatizados
- As coisas vão entrar em um nível a mais de complexidade
- Ajuda a guiar o desenvolvimento e garante que não quebre quando fizer alterações

### Preparando ambiente com testes
- npm i -D jest @types/jest ts-node 
- npm i -D @swc/jest @swc/cli @swc/core // para rodar testes mais rápido
- npx jest --init

### Testando Customer
- customer.spec.ts

### Criando testes de Order
- domain/checkout/entity/order.spec.ts

### Criando classe Product
- domain/product/entity/product.spec.ts

### Ajuste no price do OrderItem

### Relacionando Item com Product

### Jest vs SWC

## Domain Services

### Entendendo Domain Services
- Não confunda Domain Services com services
#### Domain Services
- slide1
- slide2
- slide3

#### Domain Services: Cuidados