# Ainda Há Vinho — Site para GitHub e Vercel

Este diretório contém **o site completo** da Editora Sanctus, incluindo as imagens e as marcas oficiais que estavam faltando no deploy anterior.

## Publicar no GitHub (recomendado)

1. **Extraia o ZIP no computador.** Não envie o arquivo ZIP fechado para o GitHub, pois a Vercel não descompacta ZIPs do repositório.
2. Abra o repositório `sanctus_digital`, na branch `main`, e escolha **Add file → Upload files**.
3. Arraste **o conteúdo da pasta extraída** (os arquivos `index.html`, `styles.css`, `script.js`, `config.js` e a pasta `assets`) para a página do GitHub. Se o navegador não permitir arrastar a pasta, arraste os arquivos contidos nela, preservando a estrutura das subpastas.
4. Faça o **Commit changes**. Se o repositório já contém esses arquivos, substitua-os pela versão entregue; a pasta `assets` é indispensável.
5. Na Vercel, confira se o novo deploy da branch `main` foi concluído com sucesso. Recarregue `sanctusdigital.vercel.app` com Ctrl+Shift+R (ou Cmd+Shift+R no Mac).

### Alternativa — somente reparar as imagens

Se o site já publicado estiver correto e só as imagens estiverem faltando, use o arquivo separado `sanctus-apenas-imagens.zip`. Extraia-o e envie **somente a pasta `assets`** para a raiz do repositório. Não precisa modificar HTML/CSS/JS. As imagens só aparecerão se o HTML publicado apontar para os caminhos `assets/...`, como a versão fornecida.

## Estrutura esperada na raiz do repositório

```text
index.html
styles.css
script.js
config.js
README.md
assets/
  favicon.svg
  livro-capa-recortada.png
  ebook-tablet.png
  brand/
    sanctus-simbolo-branco-otimizado.png
    sanctus-nome-branco.png
    sanctus-logo-branca-otimizada.png
    ... outras variações oficiais da marca
```

**A pasta `assets` deve ficar AO LADO de `index.html`, não dentro de uma pasta extra nem presa em um ZIP.**

## Verificação rápida após publicar

Abra diretamente estas URLs. Cada uma deve exibir uma imagem, sem 404:

- https://sanctusdigital.vercel.app/assets/livro-capa-recortada.png
- https://sanctusdigital.vercel.app/assets/brand/sanctus-simbolo-branco-otimizado.png
- https://sanctusdigital.vercel.app/assets/brand/sanctus-nome-branco.png
- https://sanctusdigital.vercel.app/assets/ebook-tablet.png

## Conteúdo e checkout

Site responsivo e estático, sem compilação. O checkout configurado aponta para `https://pay.hotmart.com/B108028666X?checkoutMode=10` como na versão anterior. Confirme o link e condições de venda antes de divulgar. Preço omitido até ser configurado em `config.js`.

As logos originais da Sanctus (PNG/SVG, branco/preto) foram preservadas em `assets/brand/`. As versões otimizadas são usadas na página.
