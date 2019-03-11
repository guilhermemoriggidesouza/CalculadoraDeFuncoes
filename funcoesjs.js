var custos = document.getElementById("custoCalcular");
var receita = document.getElementById("receitaCalcular");
var grafico = document.getElementById("graficoButton");

var SomarCustos = "";
var SomarReceita = "";
var custosOut, ReceitaOut, pontoDeEquilibrioOut;

var valorDoProduto = 0;
var variavel = 0;
var constante = 0;
var equilibrio = 0;

function aparecerSumir(aparecer, sumir){
    document.getElementById(aparecer).classList.add("d-block");
    document.getElementById(sumir).classList.add("d-none");
}
function calcularPontoDeEquilibrio(variavel, fixo, receita){
    let linhaUm = receita - variavel;
    let linhaDois = fixo/linhaUm;
    equilibrio = linhaDois;

}

custos.onclick= function(){
    variavel = document.getElementById("CustosVariaveis").value;
    constante = document.getElementById("CustosFixos").value;

    custosOut = document.getElementById("resultadoCustos");

    SomarCustos = "custo de (x) produtos = "+variavel.toString()+".X + " + constante.toString();
    custosOut.innerHTML = SomarCustos;

    aparecerSumir("Receita", "custos");
}

receita.onclick = function(){
    valorDoProduto = document.getElementById("ValorDoProduto").value;

    ReceitaOut = document.getElementById("ReceitaFinal");
    custosOut = document.getElementById("CustosFinal");
    pontoDeEquilibrioOut = document.getElementById("pontoEquilibrio");

    SomarReceita =  "receita de (x) produtos = "+valorDoProduto.toString()+".X";

    calcularPontoDeEquilibrio(variavel, constante, valorDoProduto);

    custosOut.innerHTML = SomarCustos;
    ReceitaOut.innerHTML = SomarReceita;
    pontoDeEquilibrioOut.innerHTML = equilibrio.toString();

    document.getElementById("Receita").classList.remove("d-block");
    aparecerSumir("pontoDeEquilibrio", "Receita");
}
grafico.onclick = function(){
    let pontoUm = parseInt(equilibrio);
    let pontoDois = parseInt(equilibrio*2);
    let equilibrioRow = parseInt(valorDoProduto*equilibrio);
    let custosRow = parseInt(parseInt(variavel*pontoDois)+parseInt(constante));
    let receitaRow = parseInt(valorDoProduto*pontoDois);
    let divGrafico = document.getElementById("grafico");
    
    divGrafico.classList.remove("d-none");

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
        ['Produtos'           ,'Custos'               ,'Receita'              ],
        ['0'                  ,parseInt(constante)    ,0                      ],
        [pontoUm.toString()   ,parseInt(equilibrioRow),parseInt(equilibrioRow)],
        [pontoDois.toString() ,parseInt(custosRow)    ,parseInt(receitaRow)     ]
        ]);

        var options = {
                title: 'Custos em função da Receita',
                curveType: 'function',
                legend: { position: 'bottom' },
                width: 900,
                height: 500
            };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
    }
}
