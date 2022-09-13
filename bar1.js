//Create svg2 element
var marginLeft = margin.left + 50
var barHeight = height * 1.75
var svg2 = d3.select("#chart-2 .chart")
  .append("svg")
  .attr("width", width)
  .attr("height", barHeight);

var tooltip = d3.select("#chart-2")
  .append('div')
  .style('visibility', 'hidden')
  .attr('class', 'my-tooltip')
  .attr('id', 'tooltip-2')

// Add X scale
var xScale2 = d3.scaleLinear()
  .domain([0, 100])
  .range([0, (width - margin.right - marginLeft)])

// Define X axis and format tick marks
var xAxis2 = d3.axisBottom(xScale2)
  .tickFormat(d => d + '%')
  .ticks(window.innerWidth > 640 ? 10 : 5)

var xGrid2 = d3.axisBottom(xScale2)
  .tickSize(-barHeight + (margin.top + margin.bottom), 0, 0)
  .tickFormat("")
  .ticks(10)

// Render X grid
svg2.append("g")
  .attr("transform", `translate(${marginLeft},${barHeight - margin.bottom})`)
  .attr("class", "grid")
  .style('color', 'black')
  .style('opacity', '0.2')
  .call(xGrid2)

var yScale2

d3.csv("data-2.csv")
  .then(function(csv) {
    // Add Y scale
    yScale2 = d3.scaleBand()
      .range([margin.top, barHeight - margin.bottom])
      .domain(csv.map(function(d) {
        return d.freedomLong
      }))
      .padding(.1)

    // Define Y axis
    var yAxis2 = d3.axisLeft(yScale2)
    // .tickFormat()

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + yScale2.bandwidth() * (3 / 4)
      })
      .attr("width", function(d) {
        return xScale2(d['2017']);
      })
      .attr("height", yScale2.bandwidth() / 4)
      .attr('class', (d) => {
        return `bar freedom yr-2017 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", '#132a43')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + yScale2.bandwidth() / 2
      })
      .attr("width", function(d) {
        return xScale2(d['2020']);
      })
      .attr("height", yScale2.bandwidth() / 4)
      .attr('class', (d) => {
        return `bar freedom yr-2020 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", '#d5563a')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + yScale2.bandwidth() / 4
      })
      .attr("width", function(d) {
        return xScale2(d['2021']);
      })
      .attr("height", yScale2.bandwidth() / 4)
      .attr('class', (d) => {
        return `bar freedom yr-2021 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", '#707c9c')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("rect")
      .attr("x", marginLeft)
      .attr("y", function(d) {
        return yScale2(d.freedomLong)
      })
      .attr("width", function(d) {
        return xScale2(d['2022']);
      })
      .attr("height", yScale2.bandwidth() / 4)
      .attr('class', (d) => {
        return `bar freedom yr-2022 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", '#5b1933')


    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("text")
      .attr("x", d => marginLeft + xScale2(d['2017']) + 3)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + (yScale2.bandwidth() * (3 / 4)) + ((yScale2.bandwidth() / 4)) - 5
      })
      .text(d => d['2017'] + '%')
      .attr('class', (d) => {
        return `text freedom yr-2017 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", 'black')
      .style('font-size', '9pt')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("text")
      .attr("x", d => marginLeft + xScale2(d['2020']) + 3)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + (yScale2.bandwidth() / 2) + ((yScale2.bandwidth() / 4)) - 5
      })
      .text(d => d['2020'] + '%')
      .attr('class', (d) => {
        return `text freedom yr-2020 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", 'black')
      .style('font-size', '9pt')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("text")
      .attr("x", d => marginLeft + xScale2(d['2021']) + 3)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + (yScale2.bandwidth() / 4) + ((yScale2.bandwidth() / 4)) - 5
      })
      .text(d => d['2021'] + '%')
      .attr('class', (d) => {
        return `text freedom yr-2021 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", 'black')
      .style('font-size', '9pt')

    svg2.selectAll("bars")
      .data(csv)
      .enter()
      .append("text")
      .attr("x", d => marginLeft + xScale2(d['2022']) + 3)
      .attr("y", function(d) {
        return yScale2(d.freedomLong) + ((yScale2.bandwidth() / 4)) - 5
      })
      .text(d => d['2022'] + '%')
      .attr('class', (d) => {
        return `text freedom yr-2022 ${d.freedom.toLowerCase().replaceAll('. ', '-')}`
      })
      .style("fill", 'black')
      .style('font-size', '9pt')

    // Render X axis
    svg2.append("g")
      .attr("transform", `translate(${marginLeft},${barHeight - margin.bottom})`)
      .attr('class', 'x-axis')
      .call(xAxis2)
      .style('color', 'black')
      .selectAll("text")
      .attr("transform", "translate(0,0)")
      .attr("text-anchor", "middle")

    //Render Y axis
    svg2.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .attr('class', 'y-axis')
      .style('color', 'black')
      .call(yAxis2)
      .selectAll(".tick text")
      // .attr("transform", `translate(${-marginLeft/2},0)`)
      .style('text-anchor', 'end')
      .style('font-size', '10pt')
      .attr('class', (d) => {
        return 'freedom ' + d.toLowerCase().replaceAll(' ', '-').replaceAll('.', '')
      })
      .call(wrapText, (marginLeft / 1.2))
      .data(csv)
      .style('fill', 'black')
  })

d3.selectAll('#chart-2 .legend .year-legend')
  .on('mouseover', () => {

    svg2.selectAll('#chart-2 .bar.freedom, #chart-2 .text.freedom')
      .style('opacity', .1)

    svg2.selectAll(`#chart-2 .bar.freedom.${event.target.classList[1]}, #chart-2 .text.freedom.${event.target.classList[1]}`)
      .style('opacity', 1)
  })
  .on('mouseout', () => {
    svg2.selectAll('#chart-2 .bar.freedom, #chart-2 .text.freedom')
      .style('opacity', 1)
  })