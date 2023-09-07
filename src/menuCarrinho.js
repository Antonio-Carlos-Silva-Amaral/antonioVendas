import { catalogo, salvarLocalStorege,lerLocalStorage } from "./utilidades";
// na funcao salvarlocalstorege eu passo primeiro argumento chave,e depois a informacao e exucuto a funcao em todos lugares que o carrinho é modificado 
//?? ele olha pra informacao na esquerda se tem um valor válido,
//se ele nao for ele executa a direita

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho () {
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    document.getElementById("carrinho").classList.add("right-[0px]");
}


// Aqui ele remove o right 0 que faz ele aparecer e coloca um right -360px que vai ele desaparecer
function fecharCarrinho () {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}


function irParaCheckout(){
    // esse object.keys ele gera uma lista de todas as chaves do objeto e length pega quantas tem
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    }

    // aqui eu to pegando o endereco da minha pagina e adicionando para ele navegar para outra 
    window.location.href =  "./checkout.html"
}

//Exportei esta função para usar em outros arquivos js
export function inicializarCarrinho () {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbirCarrinho.addEventListener("click", abrirCarrinho)
    const botaoIrParaCheckout = document.getElementById('finalizar-compra').addEventListener('click',irParaCheckout)
}


function removerDoCarrinho(idProduto){
    // delete apaga esse campo do objeto
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorege('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto (idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorege('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto)
}
function decrementarQuantidadeProduto (idProduto) {
    if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorege('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto)
}

function atualizarInformacaoQuantidade(idProduto) {
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenhorProdutoNoCarrinho(idProduto){
       // find significa ache, aqui quando chama essa funcao ele recebe o idProduto e com a variavel produto recupera este produto
       const produto = catalogo.find(p => p.id == idProduto)
       const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
   
       const elementoArticle = document.createElement("article");
       const articleClass = ['flex','bg-slate-100','rounded-lg','p-1','relative']
       for (const articleClasses of articleClass){
           elementoArticle.classList.add(articleClasses)
       }
   
       const cartaoProdutoCarrinho = `
       <button id="remover-item-${produto.id}" class="absolute top-0 right-2">
         <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
       </button>
       <img 
           src="./assets/img/${produto.imagem}" 
           alt="Carrinho: ${produto.nome}" 
           class="h-24 rounded-lg"
       >
       <div class="p-2 flex flex-col justify-between">
         <p class="text-slate-900 text-sm">${produto.nome}</p>
         <p class="text-slate-400 text-xs">Tamanho: M</p>
         <p class="text-green-700 text-lg">$${produto.preco}</p>
       </div>
       <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
           <button id="decrementar-produto-${produto.id}">-</button>
           <p id="quantidade-${produto.id}" class="ml-2">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
           <button class="ml-2" id="incrementar-produto-${produto.id}">+</button>
       </div>
   `
     elementoArticle.innerHTML = cartaoProdutoCarrinho;
     //appendChild ele joga os elementos para dentro como filho
     containerProdutosCarrinho.appendChild(elementoArticle); 
   
     document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));
     document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));
     document.getElementById(`remover-item-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}


export function renderizarProdutosCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = '';

    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenhorProdutoNoCarrinho(idProduto);
    }
    
}


export function adicionarAoCarrinho (idProduto) {
    //esse in ele verifica se idProduto existe em idsProdutoCarrinhoComQuantidade
        if(idProduto in idsProdutoCarrinhoComQuantidade){
            incrementarQuantidadeProduto(idProduto);
            return;
        }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorege('carrinho', idsProdutoCarrinhoComQuantidade);
    desenhorProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho (){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }

    precoCarrinho.innerText = `Total : $${precoTotalCarrinho}`;

    salvarLocalStorege('precoTotalCarrinho',precoTotalCarrinho)
}


