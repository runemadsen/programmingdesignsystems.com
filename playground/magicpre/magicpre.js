function renderExample(opt) {

  var div = $('<div class="example '+opt.klass+'"><h1>' + opt.title + '</h1><div class="wrapper"></div></div>');

  // run full opt.code

  // split code from comments
  var split = opt.code.split('\n');
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
});
