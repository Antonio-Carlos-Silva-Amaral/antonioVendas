export const catalogo = [
    { 
        id: "1", 
        marca: 'Zara', 
        nome: 'Camisa Larga com Bolsos', 
        preco: 70, 
        imagem: 'product-1.jpg', 
        feminino: false, 
    }, 

    { 
        id: "2", 
        marca: 'Zara', 
        nome: 'Casaco Reto com Lã',
        preco: 85, 
        imagem: 'product-2.jpg', 
        feminino: true, 
    }, 

    { 
        id: "3", 
        marca: 'Zara', 
        nome: 'Jaqueta com Efeito Camurça', 
        preco: 60, 
        imagem: 'product-3.jpg', 
        feminino: false,  
    }, 

    { 
        id: "4", 
        marca: 'Zara', 
        nome: 'Sobretudo em Mescla de Lã', 
        preco: 160, 
        imagem: 'product-4.jpg', 
        feminino: false, 
    }, 

    { 
        id: "5", 
        marca: 'Zara', 
        nome: 'Camisa Larga Acolchoada de Veludo Cotelê', 
        preco: 110, 
        imagem: 'product-5.jpg', 
        feminino: false, 
    }, 

    { 
        id: "6", 
        marca: 'Zara', 
        nome: 'Casaco de Lã com Botões', 
        preco: 170, 
        imagem: 'product-6.jpg', 
        feminino: true, 
    }, 

    { 
        id: "7", 
        marca: 'Zara', 
        nome: 'Casaco com Botões', 
        preco: 75, 
        imagem: 'product-7.jpg', 
        feminino: true, 
    }, 

    { 
        id: "8", 
        marca: 'Zara', 
        nome: 'Colete Comprido com Cinto', 
        preco: 88, 
        imagem: 'product-8.jpg', 
        feminino: true, 
    }
        
];

export function salvarLocalStorege (chave, informacao){
    //setItem e pra jogar no localsatorage
    //json.stringify json lida com objetos e stringify transforma o objeto em texto
    // esse informacao eu to recebendo o objeto que armazena os produto
    localStorage.setItem(chave,  JSON.stringify(informacao));
}

export function lerLocalStorage (chave){
    // getItem para pegar o valor da chave
    // ele faz contrario ele transforma em objeto
   return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave)
}

export function desenhorProdutoNoCarrinhoSimples(idProduto,idContainerHtml,quantidadeProduto){
    // find significa ache, aqui quando chama essa funcao ele recebe o idProduto e com a variavel produto recupera este produto
    const produto = catalogo.find(p => p.id == idProduto)
    const containerProdutosCarrinho = document.getElementById(idContainerHtml);

    const elementoArticle = document.createElement("article");
    const articleClass = ['flex','bg-stone-200','rounded-lg','p-1','relative','mb-2','w-96']
    for (const articleClasses of articleClass){
        elementoArticle.classList.add(articleClasses)
    }

    const cartaoProdutoCarrinho = `
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
        <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto}</p>
    </div>
`
  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  //appendChild ele joga os elementos para dentro como filho
  containerProdutosCarrinho.appendChild(elementoArticle); 

  
}