// set the dimensions and margins of the graph
var margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 80
}

var winWidth = window.innerWidth
var rawWidth = document.getElementById('chart-1').offsetWidth
var width = rawWidth;
var height = 300;

// Add X scale
var xScale = d3.scaleLinear()
  .range([margin.left, width - margin.right])
  .domain([2006, 2022])

var tickVals = [2006, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]

var refinedTickVals = window.innerWidth > 600 ? tickVals : tickVals.filter(d => d === 2006 || d === 2011 || d % 3 === 0)

// Define X axis
var xAxis = d3.axisBottom(xScale)
  // .ticks(window.innerWidth > 450 ? 10 : 5)
  .tickFormat(d => d.toString())
  .tickValues(refinedTickVals)

function wrapText(text, width) {
  text.each(function() {
    var text = d3.select(this),
      textContent = text.text(),
      tempWord = addBreakSpace(textContent).split(/\s+/),
      x = text.attr('x'),
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy') || 0),
      tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
    for (var i = 0; i < tempWord.length; i++) {
      tempWord[i] = calHyphen(tempWord[i]);
    }
    textContent = tempWord.join(" ");
    var words = textContent.split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = .75, // ems
      spanContent,
      breakChars = ['/', '&', '-'];
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        spanContent = line.join(' ');
        breakChars.forEach(function(char) {
          // Remove spaces trailing breakChars that were added above
          spanContent = spanContent.replace(char + ' ', char);
        });
        tspan.text(spanContent);
        line = [word];
        if (lineNumber === 0) {
          tspan = text.append('tspan').attr('x', -8).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy * 1.3 + 'em').text(word);
        } else {
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', lineHeight + dy * 1.3 * lineNumber + 1 + 'em').text(word);
        }

      }
    }
    var emToPxRatio = parseInt(window.getComputedStyle(text._groups[0][0]).fontSize.slice(0, -2));
    text.attr("transform", "translate(-" + 0 + ", -" + lineNumber / 2 * emToPxRatio + ")");

    function calHyphen(word) {
      tspan.text(word);
      if (tspan.node().getComputedTextLength() > width) {
        var chars = word.split('');
        var asword = "";
        for (var i = 0; i < chars.length; i++) {
          asword += chars[i];
          tspan.text(asword);
          if (tspan.node().getComputedTextLength() > width) {
            if (chars[i - 1] !== "-") {
              word = word.slice(0, i - 1) + "- " + calHyphen(word.slice(i - 1));
            }
            i = chars.length;
          }
        }
      }
      return word;
    }
  });

  function addBreakSpace(inputString) {
    var breakChars = ['/', '&', '-']
    breakChars.forEach(function(char) {
      // Add a space after each break char for the function to use to determine line breaks
      inputString = inputString.replace(char, char + ' ');
    });
    return inputString;
  }
}