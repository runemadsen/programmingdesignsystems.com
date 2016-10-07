var React = require('react');

module.exports = React.createClass({
    displayName: 'HelloReact',
    render: function(){
      console.log('rendering')
      return <div>Hello React</div>
    }
})
