function tipTextLine(values) {
  return `<div class="tooltip-container">
  <div>Among respondents polled in <strong>${values.year}</strong>, <strong style="background-color:#646f8c;padding: 0 2px;color:white;">${values.three}% could name all three</strong> branches of government while <strong style="background-color:#d5563a;padding: 0 2px;color:white;">${values.zero}% couldn't name any.</strong>.<br/><br/>That's a differential of <strong style="background-color:${values.three > values.zero ? '#646f8c':'#ed6a5a'};padding: 0 2px;color:white;">${(values.three-values.zero)}%</strong>.</div>
  </div>`
}

var bisectDate = d3.bisector(function(d) {
  return xScale(d.year) - margin.left;
}).left

function mouseoverLine(data, index) {
  var x0 = d3.mouse(event.target)[0],
    i = bisectDate(data, x0, 1)

  var d0 = data[i - 1] !== 'dummy' ? data[i - 1] : data[i],
    d1 = i < data.length ? data[i] : data[i - 1]

  var d = (x0 + margin.left) - xScale(d0.year) > xScale(d1.year) - (x0 + margin.left) ? d1 : d0;

  var html = tipTextLine(d)

  d3.selectAll(`#chart-${index} .dot`)
    .attr('r', 3)
    .raise()


  d3.selectAll(`#chart-${index} .dot.yr-${d.year}`)
    .attr('r', 8)

  d3.select(`#tooltip-${index}`)
    .html(html)
    .attr('display', 'block')
    .style("visibility", "visible")
    .style('top', topTT(index))
    .style('left', leftTT(index))

  d3.selectAll(`#tooltip-${index} .quit`)
    .on('click', () => {
      d3.select(`#tooltip-${index}`)
        .html("")
        .attr('display', 'none')
        .style("visibility", "hidden")
        .style("left", null)
        .style("top", null);
    })
}

function mousemove(i) {
  d3.select(`#tooltip-${i}`)
    .style("visibility", "visible")
    .style('top', topTT(i))
    .style('left', leftTT(i))
}

function mouseout(i) {
  d3.select(`#tooltip-${i}`)
    .html("")
    .attr('display', 'none')
    .style("visibility", "hidden")
    .style("left", null)
    .style("top", null);
}

function topTT(d) {
  var offsetParent = document.querySelector(`#chart-${d} .chart`).offsetParent
  var offY = offsetParent.offsetTop
  var cursorY = 5

  var windowWidth = window.innerWidth
  var ch = document.querySelector(`#tooltip-${d}`).clientHeight
  var cy = d3.event.pageY - offY
  var windowHeight = window.innerHeight
  if (windowWidth > 767) {
    if (ch + cy >= windowHeight) {
      return cy - (ch / 2) + "px"
    } else {
      return cy - 28 + "px"
    }
  }
}

function leftTT(d) {
  var offsetParent = document.querySelector(`#chart-${d} .chart`).offsetParent
  var offX = offsetParent.offsetLeft
  var cursorX = 5

  var windowWidth = window.innerWidth
  var cw = document.querySelector(`#tooltip-${d}`).clientWidth
  var cx = d3.event.pageX - offX
  var bodyWidth = document.querySelector(`#chart-${d} .chart`).clientWidth

  if (windowWidth > 767) {
    if (cw + cx >= bodyWidth) {
      document.querySelector(`#tooltip-${d}`).className = 'my-tooltip box-shadow-left'
      return cx - cw - cursorX + "px"
    } else {
      document.querySelector(`#tooltip-${d}`).className = 'my-tooltip box-shadow-right'
      return cx + cursorX + "px"
    }
  }
}