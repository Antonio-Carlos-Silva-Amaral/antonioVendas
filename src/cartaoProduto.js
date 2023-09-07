import { adicionarAoCarrinho } from "./menuCarrinho"
import { catalogo } from "./utilidades"

export function henderizarCatalogo(){
    for (const produtoCatalogo of catalogo){ 
    
        const cartaoProduto = `<div class="border-solid shadow-xl shadow-slate-400 rounded-lg w-48 m-2 flex flex-col p-2 justify-between group ${produtoCatalogo.feminino ? 'feminino' : 'masculino'}" id="card-produto-${produtoCatalogo.id}">
        <img 
        src="./assets/img/${produtoCatalogo.imagem}" 
        alt="Produto 1 de Vendas Antônio"
        class="group-hover:scale-110 duration-300 cursor-pointer my-3 rounded-lg"
        />
        <p class="text-sm">${produtoCatalogo.marca}</p>
        <p class="text-sm">${produtoCatalogo.nome}</p>
        <p class="text-sm">$${produtoCatalogo.preco}</p>
        <button id='adiconar-${produtoCatalogo.id}' class="bg-slate-950 text-slate-200 hover:bg-slate-700">
        <i class="fa-solid fa-cart-plus"></i>
        </button>
        </div>`
        
        document.getElementById("container-produto").innerHTML += cartaoProduto
        
    }

    
    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adiconar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id))
    }
}