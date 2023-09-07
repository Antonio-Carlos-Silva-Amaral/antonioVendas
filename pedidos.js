import { lerLocalStorage,desenhorProdutoNoCarrinhoSimples } from "./src/utilidades";

function criarPedidoHistorico (pedidoComData) {
    // .toLocaleDateString(): Este é um método do objeto de data (Date) que converte a data em uma string no formato de data localizado, considerando as configurações de idioma e região do navegador ou do ambiente em que o JavaScript está sendo executado. 
    const elementoPedido = `<p class='text-xl text-bold my-4'>${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-br',{
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <section id='container-pedidos-${pedidoComData.dataPedido}' class='bg-slate-300 p-3 rounded-xl'></section>
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