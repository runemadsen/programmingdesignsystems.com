// This is a plugin that simply takes a p5 sketch
// and renders it in an iframe for security.
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var through = require('through2');
var cheerio = require('cheerio');
var CodeMirror = require('codemirror/addon/runmode/runmode.node.js');
require('codemirror/mode/javascript/javascript.js');

var Plugin = function(registry) {
  registry.after('codesplit:inline', 'highlight', _.bind(this.highlight, this));
};

Plugin.prototype = {

  highlight: function(config, stream, extras, callback) {

    stream = stream.pipe(through.obj(function(file, enc, cb) {

      file.$el = file.$el || cheerio.load(file.contents.toString());

      file.$el('code').each(function() {

        var jel = file.$el(this);
        var content = jel.html();
        var curStyle = null;
        var accum = "";
        var highlighted = "";

        function esc(str) {
          return str.replace(/[<&]/g, function(ch) { return ch == "&" ? "&amp;" : "&lt;"; });
        }

        function flush() {
          if(curStyle) {
            highlighted += "<span class=\"" + curStyle.replace(/(^|\s+)/g, "$1cm-") + "\">" + esc(accum) + "</span>"
          } else {
            highlighted += esc(accum);
          }
        }

        CodeMirror.runMode(content, "text/javascript", function(text, style) {
          if (style != curStyle) {
            flush();
            curStyle = style;
            accum = text;
          } else {
            accum += text;
          }
        });
        flush();

        jel.html(highlighted);

        var parent = jel.parent();
        if(parent[0].tagName == 'pre') {
          parent.addClass('cm-s-pds');
        }
        else {
          jel.addClass('cm-s-pds');
        }
      });

      cb(null, file);
    }));

    callback(null, config, stream, extras);
  }
}

module.exports = Plugin;
