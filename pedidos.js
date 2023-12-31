import { lerLocalStorage,desenhorProdutoNoCarrinhoSimples } from "./src/utilidades";


function criarPedidoHistorico (pedidoComData) {
    const elementoPedido = `<p class='text-xl text-bold my-4'>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-br',{
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <section id='container-pedidos-${pedidoComData.dataPedido}' class='bg-slate-300 p-3 rounded-xl'>
    <p id="preco-total-compra" class="bg-slate-200 text-green-800 rounded-sm pl-5 m-2">Total: ${pedidoComData.precoFinal}</p>
    </section>
    `
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += elementoPedido;
    
    for(const idProduto in pedidoComData.pedido){
        desenhorProdutoNoCarrinhoSimples(idProduto,`container-pedidos-${pedidoComData.dataPedido}`,pedidoComData.pedido[idProduto])
    }
}

function renderizarHistoricoPedidos (){
    const historico = lerLocalStorage('historico');
    for(const pedidoComData of historico){
        criarPedidoHistorico(pedidoComData)
    }
}

renderizarHistoricoPedidos();