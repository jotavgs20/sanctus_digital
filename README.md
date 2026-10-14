# Ainda Há Vinho — nova versão

Landing page com estética editorial noturna inspirada na referência: fundo azul-roxo profundo, luzes violetas, cards de conteúdo e capa do livro em destaque. Projetada para celular, tablet e desktop.

## Como abrir

Extraia o ZIP e abra o arquivo `index.html` dentro da pasta `ainda-ha-vinho-nova-versao`. Para publicar, hospede **todos os arquivos e a pasta `assets`** juntos em uma hospedagem de sites estáticos. Não requer bibliotecas, instalação ou etapa de compilação.

## Compra e preço

O botão final de compra mantém o checkout já encontrado no site enviado:
`https://pay.hotmart.com/B108028666X?checkoutMode=2`

O valor não é exibido porque não foi fornecido. Em `config.js`, coloque o preço numérico em `price` e, se necessário, a observação real em `paymentNote`.

Se o endereço do checkout mudar, atualize **`checkoutUrl` em `config.js`** e também o link do botão final `data-checkout` no HTML. Assim a compra funciona também quando o JavaScript estiver desativado.

## Capa e formato do produto

Foi usada a imagem enviada com a nova capa do livro e retirado apenas o fundo da foto para aplicar na composição. O site original oferta um **e-book digital**: mantivemos esse formato, sem criar promessa de livro impresso, depoimentos, descontos, preços ou resultados garantidos. A capa 3D é ilustrativa.

## Personalização

- `index.html`: textos, seções e âncoras.
- `styles.css`: cores, efeitos e visual responsivo.
- `config.js`: checkout, preço e informação de pagamento.
- `assets/livro-capa-recortada.png`: capa do livro destacada no hero e na oferta.

Os arquivos funcionam localmente e podem ser publicados em hospedagem estática. Antes de colocar no ar, confira checkout real, condições comerciais, dados legais obrigatórios e faça uma compra de teste.

## Identidade visual da Editora Sanctus

As marcas oficiais enviadas foram incorporadas ao **cabeçalho** (símbolo e lettering originais), ao **rodapé** (logo completa branca) e ao **ícone do navegador** (símbolo vetorial sobre fundo escuro).

Os **12 arquivos originais**, em versões branca, preta, PNG e SVG, permanecem inalterados em `assets/brand/` para uso futuro. Os arquivos com nomes terminados em `otimizada.png` e `sanctus-nome-branco.png` são derivados recortados apenas para retirar margens transparentes e melhorar o encaixe na página. Em futuras seções de fundo claro, é possível usar as versões pretas.
