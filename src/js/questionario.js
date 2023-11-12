var kmCarro;
var eficCarro;
var kmMoto;
var eficMoto;
var kmTransPublico
var pessoasMoram;
var consumoCarne;
var energia;
var carne;
var transporte;
var resultado;

var todasAsPaginas = [document.getElementById("pagina1"), document.getElementById("pagina2"), document
    .getElementById("pagina3"), document.getElementById("pagina4"), document.getElementById("pagina5"), document
        .getElementById("pagina6"),
document.getElementById("pagina7"), document.getElementById("pagina8"), document.getElementById("pagina9")
];
var ref = 0;

function next() {
    if (ref == 9) {        
        window.location.href = "./questionario.html";
    } else {
        ref = ref + 1;
        tela();
    }

    if (ref == 8) {
        document.getElementById("botaoNext").innerHTML = "Refazer";
        document.getElementById("botaoBack").style.visibility = "hidden";
    }

    const gasCarb = 2.28;
    const carCarne = 27;
    const consumoEnergiaMensal = 1200;
    const emissaoTransportePublico = 0.3;

    kmCarro = document.getElementById("kmCarro").value;
    eficCarro = document.getElementById("eficCarro").value;
    kmMoto = document.getElementById("kmMoto").value;
    eficMoto = document.getElementById("eficMoto").value;
    kmTransPublico = document.getElementById("kmTransPublico").value;
    pessoasMoram = document.getElementById("pessoasMoram").value;
    consumoCarne = document.getElementById("consumoCarne").value;
    energia = document.getElementById("energia").value;


    transporte = ((kmCarro) / (eficCarro) * (gasCarb)) + ((kmMoto) / (eficMoto) * (gasCarb)) + ((kmTransPublico) * (emissaoTransportePublico));
    carne = (consumoCarne) * (carCarne);
    energia = (consumoEnergiaMensal) * pessoasMoram;

    resultado = transporte + carne + energia;
    var rst = resultado.toFixed(2);

    document.getElementById('resultado').innerHTML = rst;

    atualizarGrafico();
}


function back() {
    if (ref == 0) {
        window.location.href = "./index.html";

    } else {
        document.getElementById("botaoBack").enable;
        ref = ref - 1;
        tela();
    }
}

function tela() {
    todasAsPaginas[ref].style.display = "block";
    for (var i = 0; i < todasAsPaginas.length; i++) {
        if (i === ref) {
            todasAsPaginas[i].style.display = "block";
        } else {
            todasAsPaginas[i].style.display = "none";
        }
    }
}

var ctx = document.getElementById("graficoPizza").getContext("2d");
var myPieChart;

const image = new Image();
image.src = './src/img/co2.png';

const plugin = {
    id: 'customCanvasBackgroundImage',
    beforeDraw: (chart) => {
        if (image.complete) {
            const ctx = chart.ctx;
            const { top, left, width, height } = chart.chartArea;
            const x = left + width / 2 - image.width / 2;
            const y = top + height / 2 - image.height / 2;
            ctx.drawImage(image, x, y);
        } else {
            image.onload = () => chart.draw();
        }
    }
};

function criarGraficoPizza(dados, cores) {
    myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(dados),
            datasets: [{
                data: Object.values(dados),
                backgroundColor: cores,
                hoverOffset: 20,
            }]

        },
        plugins: [plugin],
    });
}

function atualizarGraficoPizza(dados) {
    myPieChart.data.datasets[0].data = Object.values(dados);
    myPieChart.update();
}

function atualizarGrafico() {

    var dadosAtualizados = {
        'Transporte': transporte,
        'Energia': energia,
        'Carne': carne,
    };

    var coresIniciais = ['rgb(255, 0, 0)', 'rgb(54, 162, 235)', 'rgb(0,255,0)'];
    if (!myPieChart) {
        criarGraficoPizza(dadosAtualizados, coresIniciais);
    } else {
        atualizarGraficoPizza(dadosAtualizados);
    }
}