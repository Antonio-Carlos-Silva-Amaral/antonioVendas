import { adicionarAoCarrinho } from "./menuCarrinho"
import { catalogo } from "./utilidades"
// quer dizer que produtoCatalogo serve para indicar que para cada produto da minha lista catalogo
// o que acontece o for é uma estrutura de repetição e ele itera sobre cada item da lista de array, entao eu 
// dei um nome produtoCatalogo entao cada objeto tem esse esse nome ai ele rederiza cada um como loopy
// como eu exportei o catalogo de utilidades agora importo ele aqui e utilizo

//esse grup ele permite tipo juntar ai quando eu uso ele na img quando eu passo o mouse emcima de qualquer parte da div ele faz o scale
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
        // Aqui eu quero dizer que dentro de container-produto ele adicione esse html escrito acima
        document.getElementById("container-produto").innerHTML += cartaoProduto
        
    }

    // Aqui eu usei a funcao anonima para informar o id e envair para recuperar o produto 
    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adiconar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id))
    }
}