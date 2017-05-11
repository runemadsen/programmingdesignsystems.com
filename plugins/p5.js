// This is a plugin that simply takes a p5 sketch
// and renders it in an iframe for security.
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var tinyliquid = require('tinyliquid');

// This is stupid, but manually turn a global P5 sketch into
// a instance mode sketch. Only works because I know what code
// I'm writing.
var replacements = [
  ['function setup(', 'p.setup = function('],
  ['function draw(', 'p.draw = function('],
  'background(',
  'beginContour(',
  'beginShape(',
  'bezierVertex(',
  'CENTER',
  'CLOSE',
  'colorMode(',
  'createVector(',
  'CORNER',
  'cos(',
  'createCanvas(',
  'ellipse(',
  'ellipseMode(',
  'endContour(',
  'endShape(',
  'fill(',
  'frameCount',
  'frameRate(',
  'height',
  'HSB',
  'HSL',
  'ITALIC',
  'line(',
  'noFill(',
  'noStroke(',
  'pop(',
  'push(',
  'radians(',
  'random(',
  'rect(',
  'rectMode(',
  'RGB',
  'rotate(',
  'ROUND',
  'sin(',
  'stroke(',
  'strokeCap(',
  'strokeJoin(',
  'strokeWeight(',
  'SQUARE',
  'text(',
  'textFont(',
  'textSize',
  'textStyle(',
  'translate(',
  'triangle(',
  'vertex(',
  'width',
  'quadraticVertex(',
  'noLoop('
]

var Plugin = function(registry) {
  this.cache = {};
  registry.before('load', 'p5:tag', _.bind(this.liquidTag, this));
};

Plugin.prototype = {

  liquidTag: function(config, extras, cb) {

    var count = 0;
    var that = this;

    // function that gets called for every p5 tag
    function p5tag(context, tag, input) {

      // Get name of example file to load
      var example = input.split(' ')[0];
      var examplePath = path.join('examples', example);

      // Get the attributes
      var attrs = {};
      var pattern = new RegExp('([a-zA-Z]+)\:[\"\']([^\"\']+)[\"\']', 'g');
      var match = null;
      while (match = pattern.exec(input)) { attrs[match[1]] = match[2]; }

      // let's use caching so we don't load the same files over
      // and over again.
      if(!that.cache[examplePath]) {
        that.cache[examplePath] = fs.readFileSync(examplePath).toString();
      }

      var code = that.cache[examplePath];
      for(var i = 0; i < replacements.length; i++) {

        // if replacement is string, just add p
        if(typeof replacements[i] == 'string') {
          code = code.replace(new RegExp(replacements[i].replace('(', '\\('), 'g'), 'p.' + replacements[i])
        }
        // if replacement is array with before/after
        else {
          code = code.replace(new RegExp(replacements[i][0].replace('(', '\\('), 'g'), replacements[i][1])
        }

      }

      var idAttr = 'example' + count;
      var script = 'window.p5Examples = window.p5Examples || [];\n'
        + 'window.p5Examples.push(["'+idAttr+'", function(p) {' + code + '}])';

      // Render baby
      var output = '<figure class="'+(attrs.class||'')+'"><div id="'+idAttr+'"></div><script type="text/javascript">'+script+'</script>';
      if(attrs.link || attrs.caption) {
        output += '<figcaption>'
        if(attrs.caption) output += attrs.caption;
        if(attrs.link) output += ' <a target="_blank" href="https://github.com/runemadsen/programmingdesignsystems.com/tree/master/'+examplePath+'">See Code</a>'
        output += '</figcaption>'
      }
      output += '</figure>'
      context.astStack.push(tinyliquid.parse(output));

      count++;
    }

    _.set(config, 'liquid.customTags.p5', p5tag);

    cb(null, config, extras);
  }
}

module.exports = Plugin;
