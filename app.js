var initialPrice = document.querySelector("#initial-price")
var stocksQuantity = document.querySelector("#stocks-quantity")
var currentPrice = document.querySelector("#current-price")
var submitBtn = document.querySelector("#submit-btn")
var outputBox = document.querySelector("#output-box")

submitBtn.addEventListener('click', submitHandler);

function submitHandler() {
    var ip = Number(initialPrice.value)
    var qty = Number(stocksQuantity.value)
    var curr = Number(currentPrice.value)

    calculateProfitAndLoss(ip, qty, curr)

}

function calculateProfitAndLoss(initial, quantity, current) {
    if (initial == "" || current == "" || quantity == "") {
        showOutput(`Please fill out all fields`, "red")
    }
    else if (initial > current) {
        // LOSS LOGIC HERE
        var loss = (initial - current) * quantity;
        var lossPercentage = (loss / initial) * 100;
        // console.log(`Hey the loss is ${loss} and the percentage is ${lossPercentage} %`)
        showOutput(`Hey the loss is ${loss.toFixed(2)} and the percentage is ${lossPercentage.toFixed(2)} %`, "red")

        displayGraph(Number(lossPercentage) + 2, [
            { id: '1', value: Number(initial), names: 'Initial' },
            { id: '2', value: Number(current), names: 'Current' },
        ])
        // console.log(Number(initial))
        // console.log(Number(current))
        // console.log(Number(lossPercentage))
        // document.querySelector('.bar').style.fill = "red"

    } else if (current > initial) {
        // PROFIT LOGIC HERE
        var profit = (current - initial) * quantity;
        var profitPercentage = (profit / initial) * 100;
        // console.log(`Hey the profit is ${profit} and the percentage is ${profitPercentage} %`)
        showOutput(`Hey the profit is ${profit.toFixed(2)} and the percentage is ${profitPercentage.toFixed(2)} %`, "green")

        displayGraph(profitPercentage + 2, [
            { id: '1', value: Number(initial), names: 'Initial' },
            { id: '2', value: Number(current), names: 'Current' },
        ])
        // document.querySelector('.bar').style.fill = "green"

    } else {
        // NO PROFIT NO LOSS
        // console.log(`No pain no gain and no gain no pain`)
        showOutput(`No pain no gain and no gain no pain`, "black")

    }
}

function showOutput(message, color) {
    outputBox.innerHTML = message
    outputBox.style.color = color
    outputBox.style.fontSize = "x-large"
}

// calculateProfitAndLoss(100, 10, 10) // LOSS
// calculateProfitAndLoss(20, 10, 100) // PROFIT
// calculateProfitAndLoss(10, 10, 10) // NO LOSS, NO PROFIT

function displayGraph(maxScale, Datas) {
    var myData = Datas;
    var xScale = d3.scaleBand().domain(myData.map(dataPoint => dataPoint.names)).rangeRound([0, 250]).padding(0.1);
    var yScale = d3.scaleLinear().domain([0, Number(maxScale)]).range([250, 0]);
    var container = d3.select('svg').classed('container', true);

    var bars = container
        .selectAll('.bar')
        .data(myData)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('width', xScale.bandwidth())
        .attr('height', (data) => 250 - yScale(data.value))
        .attr('x', data => xScale(data.names))
        .attr('y', data => yScale(data.value))

    // .attr('height', (data) => console.log(250 - yScale(data.value)))
    // .attr('height', (data) => ((250 - yScale(data.value) >= 250)) ? ((250 - yScale(data.value)) / 2) : (250 - yScale(data.value)))

}
// yScale(data.value)