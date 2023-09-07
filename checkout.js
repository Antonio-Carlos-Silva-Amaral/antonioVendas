import { desenhorProdutoNoCarrinhoSimples,lerLocalStorage,apagarDoLocalStorage,salvarLocalStorege } from "./src/utilidades";

function desenharProdutosCheckout (){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    for(const idProduto in idsProdutoCarrinhoComQuantidade){
        desenhorProdutoNoCarrinhoSimples(idProduto,"container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto])
    }
}

function precoHistoricoPedido (){
    const precoHistorico = document.getElementById('preco-total')
    const precoTotalCarrinho = localStorage.getItem('precoTotalCarrinho')
    precoHistorico.innerText = `Total: $${precoTotalCarrinho}`
}

function finalizarCompra (evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido : dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    }

    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorege('historico', historicoDePedidosAtualizado)
    apagarDoLocalStorage('carrinho');
    window.location.href = './pedidos.html';
}


desenharProdutosCheckout();
precoHistoricoPedido();


document.addEventListener('submit', (evt) => finalizarCompra(evt));