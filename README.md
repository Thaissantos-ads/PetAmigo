# PetAmigo: adoção e cuidados com animais

Projeto individual da disciplina **Desenvolvimento Front-End**, da Universidade Cruzeiro do Sul.

**Autora:** Thaís Santos
**Professor:** Abinael Gomes Barreiros

## Sobre o projeto

O PetAmigo é um site que aproxima pessoas de cães e gatos que procuram um lar. Ele reúne navegação entre páginas, filtros, galeria de fotos, mapa, formulários com validação e login.

## Páginas

- **Início:** apresentação, animais em destaque e como adotar
- **Adoção:** lista de animais com filtro por tipo (cão ou gato) e busca por nome
- **Mapa:** clínicas e petshops com filtro e mapa incorporado
- **Galeria:** fotos com ampliação, navegação por botões e teclado
- **Contato:** formulário com validação de campos
- **Entrar:** login e cadastro de conta

## Tecnologias

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS e media queries)
- JavaScript (manipulação do DOM, eventos e localStorage)
- SVG (logotipo)
- Google Maps incorporado e Google Fonts (Poppins)

## Responsividade

O layout se adapta a computador, tablet e celular, com menu hambúrguer em telas pequenas.

## Como executar

1. Baixe o projeto (botão **Code**, depois **Download ZIP**) e extraia a pasta.
2. Abra o arquivo `index.html` no navegador.

O mapa precisa de conexão com a internet.

## Estrutura de pastas

- `index.html`: página inicial
- `pages/`: demais páginas do site
- `css/`: estilos (`style.css` e `responsivo.css`)
- `js/`: scripts de cada funcionalidade
- `img/`: fotos da galeria

## Observações

- Os animais, clínicas e petshops são **fictícios**, criados para fins didáticos.
- O login usa o `localStorage` do navegador apenas para demonstração. Em um site real, cadastro e autenticação ficam no servidor, com senha criptografada.
- As fotos da galeria são de uso gratuito (https://unsplash.com/pt-br).