import React from 'react'
import Quill from 'quill'
import PropTypes from 'prop-types'

class ReactQuill extends React.Component {
  constructor (props) {
    super(props)

    this.init = this.__init.bind(this)

    this.$quill = false
    this.$el = false

    this.getHTML = () => {
      if (this.$el) {
        return this.$el.querySelector('.ql-editor').innerHTML
      }
    }
  }

  __init (el) {
    if (el) {
      const options = {...this.props.options}

      // init Quill
      this.$quill = new Quill(el, options)

      // registry event handlers
      for (let name in this.props.events) {
        const handler = this.props.events[name]
        this.$quill.on(name, handler)
      }

      // registry onChange
      this.$quill.on('text-change', () => {
        if (this.props.onChange) {
          this.props.onChange(this.getHTML())
        }
      })

      this.$el = el
    }
  }

  render () {
    return (
      <div>
        <div ref={this.init}></div>
      </div>
    )
  }
}

ReactQuill.propTypes = {
  options: PropTypes.object,
  events: PropTypes.object,
  onChange: PropTypes.func
}

export default ReactQuill
