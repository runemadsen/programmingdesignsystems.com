function renderExample(opt) {

  var div = $('<div class="example '+opt.klass+'"><h1>' + opt.title + '</h1><div class="wrapper"></div></div>');

  // run full opt.code

  // if we pick out just some code
  if(opt.pick) {
    var startIndex = opt.code.indexOf(opt.pick.start)
    var stopIndex = opt.code.indexOf(opt.pick.stop)
    if(startIndex > -1 && stopIndex > -1) {
      opt.code = opt.code.substring(startIndex, stopIndex + opt.pick.stop.length);
    } else {
      console.log("pick values not found");
    }

  }

  var split = opt.code.split('\n');

  // if the first line has indent, let's remove this indent from all
  // lines. This is good when picking lines that are indented.
  var padnum = split[0].search(/\S|$/);
  var regex = new RegExp("^\\s{"+padnum+"}");
  if(padnum > 0) {
    split = _.map(split, function(line) {
      return line.replace(regex, '');
    });
  }

  // split code from comments
  var containers = [];
  for(var i = 0; i < split.length; i++) {
    var type = split[i].match(/^\s*\/\//) ? "comment" : "code";
    if(containers.length == 0 || containers[containers.length-1].type !== type) {
      containers.push({ type: type, lines: [] })
    }
    containers[containers.length-1].lines.push(split[i]);
  }

  // create divs from the containers
  for(var i = 0; i < containers.length; i++) {

    // if this is a comment, we join all lines into
    // a single paragraph
    if(containers[i].type == "comment") {
      var para = _.map(containers[i].lines, function(line) {
        return line.replace('//', '').trim();
      }).join('');
      var jel = $('<div class="comment"><p>' + para + '</p></div>');
      div.find('.wrapper').append(jel);
    // if this is lines of code, put in a pre element
    } else if(containers[i].type == "code") {
      var lines = containers[i].lines.join('\n');
      var jel = $('<pre class="code"><code>' + lines + '</code></pre>');
      div.find('.wrapper').append(jel);
    }
  }

  $('body').append(div);

}

$(function() {
  var code = $('pre').text();
  renderExample({
    title: 'Vertical splitting',
    code: code
  });
  renderExample({
    title: 'Horizontal splitting',
    code: code,
    klass: 'horiz'
  });
  renderExample({
    title: 'Showing parts of code',
    code: code,
    pick: { start: "// Remember", stop: "  y = y + yspeed;" }
  });
});
