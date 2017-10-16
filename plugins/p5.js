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
  'color(',
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
  /\s(lerp\()/g,
  'line(',
  'noFill(',
  'noStroke(',
  'pop(',
  'push()',
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
          var escaped = replacements[i]
            .replace('(', '\\(')
            .replace(')', '\\)');
          code = code.replace(new RegExp(escaped, 'g'), 'p.' + replacements[i])
        }
        // If replacement is regexp. NOT USED YET
        else if(replacements[i] instanceof RegExp) {
          code = code.replace(replacements[i], function(match, p1) {
            return 'p.' + p1;
          });
        }
        // if replacement is array with before/after
        else if(Array.isArray(replacements[i])) {
          code = code.replace(new RegExp(replacements[i][0].replace('(', '\\('), 'g'), replacements[i][1])
        }
        // if replacement is regexp
        else {
          console.error('WRONG REPLACEMENT')
        }

      }

      var idAttr = 'example' + count;
      var script = 'window.p5Examples = window.p5Examples || [];\n'
        + 'window.p5Examples.push(["'+idAttr+'", function(p) {' + code + '}])';

      var caption = false;
      if(attrs.link || attrs.caption) {
        caption = '<figcaption>';
        if(attrs.caption) caption += attrs.caption;
        if(attrs.link)    caption += ' <a target="_blank" href="https://github.com/runemadsen/programmingdesignsystems.com/tree/master/'+examplePath+'">See Code</a>'
        caption += '</figcaption>'
      }

      // Render baby
      var output = '<figure class="'+(attrs.class||'')+'">';
      if(caption && attrs.captionPosition == 'top') {
        output += caption;
      }
      output += '<div id="'+idAttr+'"></div><script type="text/javascript">'+script+'</script>';
      if(caption && attrs.captionPosition !== 'top') {
        output += caption;
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
