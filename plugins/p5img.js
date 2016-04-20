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
    function p5img(context, tag, example) {

      var examplePath = path.join('examples', example);

      // let's use caching so we don't load the same files over
      // and over again.
      if(!that.cache[examplePath]) {
        that.cache[examplePath] = fs.readFileSync(examplePath).toString();
      }

      // find the width and the height from the code
      var code = that.cache[examplePath];
      var match = /createCanvas\((\d+),\s*(\d+)\)/.exec(code)
      if(!match) console.warn('Example appears to not have a createCanvas function.');
      var w = match[1];
      var h = match[2];

      var output = '<script class="p5img" data-width="'+w+'" data-height="'+h+'" data-p5-version="'+config.p5Version+'" type="text/p5">'+that.cache[examplePath]+'</script>';
      context.astStack.push(tinyliquid.parse(output));
    }

    _.set(config, 'liquid.customTags.p5img', p5img);

    cb(null, config, extras);
  }
}

module.exports = Plugin;
