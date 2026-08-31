# 📸 Galeria & Álbum de Memórias — v2.0

Uma evolução focada em **performance, arquitetura e refatoração de código** para a aplicação web desenvolvida em **React** e **Vite**. A versão 2.0 mantém a identidade visual e o design da primeira versão, mas traz um código significativamente mais leve, otimizado e expansível.

---

## 💡 Motivação & Evolução Técnica

A primeira versão deste projeto foi desenvolvida em fevereiro de 2026. Após meses de estudos e aprofundamento em tecnologias front-end, decidi retornar ao código original para uma revisão completa. 

Com uma visão técnica mais madura, identifiquei gargalos de performance, oportunidades de refatoração, regras de CSS que causavam comportamentos indesejados no projeto. O resultado foi a implementação de novas ideias, uma aplicação muito mais leve, limpa, sustentável e fácil de manter.

---

## 🚀 O que mudou na Versão 2.0?

Enquanto a interface visual e o design do site foram mantidos para preservar a experiência, a estrutura interna passou por uma reformulação completa.

### ✨ Principais Melhorias & Refatoração

### ✨ Principais Melhorias & Refatoração

* **Otimização e Leveza do Código:** Refatoração ampla de componentes e estilização CSS, reduzindo a complexidade de renderização e deixando a navegação mais fluida e rápida.
* **Novos Layouts e Templates de Exibição:** Introdução dos **Templates 7, 8 e 9**, permitindo novas combinações e disposições visuais para os blocos de fotos no JSON.
* **Módulo de Envio e Upload de Mídias:** Implementação do menu e fluxo interativo para upload de novas fotos na interface.
* **Reordenação Interativa de Templates:** Sistema intuitivo de *Drag and Drop* para personalização da sequência dos blocos de memória, com visualização em tempo real via *dot grid pattern* e transições de *fade*.
* **Organização e "Documentação" Interna:** Padronização completa do código com comentários descritivos por seções nos arquivos JSX e CSS, facilitando a manutenção.

---

## 🛠️ Tecnologias Utilizadas

* **React**, **Vite**, **React Router DOM**, **CSS3**, **HTML5**, **JSON**, **JavaScript**

---

## ⚙️ Destaques da Aplicação

## ⚙️ Destaques da Aplicação

* **Reordenação Fluida (Drag & Drop):** Drag and drop nativo estilizado, com *dropzone* (*dot grid pattern*), transições de opacidade (*fade-in / fade-out*) e prevenção contra interrupções de renderização no hover.
* **Gerenciamento e Envio de Fotos:** Menu dedicado para seleção e upload de mídias, integrado diretamente ao fluxo da aplicação.
* **Sistemas de Templates Flexíveis:** Suporte expandido a múltiplos layouts visuais, permitindo exibição dinamicamente ajustada conforme a quantidade de mídias.
* **Persistência de Tema:** Modo Escuro e Claro com alternância suave e salvamento automático das preferências no `localStorage`.
* **Visualização em Modal:** Expansão de fotos com rolagem interna, metadados (data e legenda).
* **Navegação Inteligente:** Botão flutuante para retorno ao topo ativado dinamicamente pelo evento de scroll.