// This is a plugin that simply takes a p5 sketch
// and renders it in an iframe for security.
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var tinyliquid = require('tinyliquid');

var Plugin = function(registry) {
  this.cache = {};
  registry.before('load', 'p5img:tag', _.bind(this.liquidTag, this));
};

Plugin.prototype = {

  liquidTag: function(config, extras, cb) {

    var that = this;

    // function that gets called for every p5img tag
    function p5img(context, tag, input) {

      // Get name of example file to load
      var example = input.split(' ')[0];
      var examplePath = path.join('examples', example);

      // Get the attributes
      var attrs = {};
      var pattern = new RegExp('([a-zA-Z]+)\:("|\')(.+)("|\')', 'g');
      var match = null;
      while (match = pattern.exec(input)) { attrs[match[1]] = match[3]; }

      // let's use caching so we don't load the same files over
      // and over again.
      if(!that.cache[examplePath]) {
        that.cache[examplePath] = fs.readFileSync(examplePath).toString();
      }

      // Render baby
      var output = '<script type="text/p5" class="p5'+ (attrs["class"] ? ' '+attrs["class"] : '') +'">'+that.cache[examplePath]+'</script>';
      context.astStack.push(tinyliquid.parse(output));

    }

    _.set(config, 'liquid.customTags.p5', p5img);

    cb(null, config, extras);
  }
}

module.exports = Plugin;
