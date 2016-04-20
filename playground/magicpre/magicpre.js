function renderExample(opt) {

  var div = $('<div class="example"><div class="wrapper"></div></div>');

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
      }).join(' ');
      var jel = $('<div class="cs-comment"><p>' + para + '</p></div>');
      div.find('.wrapper').append(jel);
    // if this is lines of code, put in a pre element
    } else if(containers[i].type == "code") {
      var lines = containers[i].lines.join('\n');

      // if this is going to be shows as one big field
      // let's preserve the exact spacing.
      if(opt.keepLastLinebreak) {
        lines += '\n';
      }

      var jel = $('<div class="cs-code"><pre><code>' + lines + '</code></pre></div>');
      div.find('.wrapper').append(jel);
    }
  }

  // highlight all code examples. THIS SHOULD NOT BE A PART OF THE
  // CODESPLITTING PLUGIN.
  div.find('.cs-code').each(function() {
    var preEl = $(this).find('pre');
    var content = preEl.find('code').text();
    CodeMirror.runMode(content, "text/javascript", preEl[0]);
    preEl.addClass('cm-s-pds');
  });

  $(opt.el).append(div);

}

$(function() {

  var code = $('pre').text();

  renderExample({
    el: '#one',
    code: code
  });

  renderExample({
    el: '#two',
    code: code
  });

  renderExample({
    el: '#three',
    code: code,
    pick: { start: "// Remember", stop: "  y = y + yspeed;" }
  });

});
