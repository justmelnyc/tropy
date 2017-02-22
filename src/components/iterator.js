'use strict'

const React = require('react')
const { PureComponent, PropTypes } = React
const { STYLE } = require('../constants')
const { bounds, on, off } = require('../dom')
const { times } = require('../common/util')
const { number } = PropTypes


class Iterator extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      cols: 1
    }
  }

  componentDidMount() {
    if (this.constructor.isGrid) {
      on(window, 'resize', this.resize)
      this.resize()
    }
  }

  componentWillUnmount() {
    if (this.constructor.isGrid) {
      off(window, 'resize', this.resize)
    }
  }

  componentWillReceiveProps(props) {
    if (this.constructor.isGrid) {
      if (this.props.size !== props.size) {
        this.resize()
      }
    }
  }

  get isVertical() {
    return this.state.cols === 1
  }

  get isHorizontal() {
    return !this.isVertical
  }

  get isEmpty() {
    return this.size === 0
  }

  get size() {
    return this.iteration.length
  }

  get orientation() {
    return this.isVertical ? 'vertical' : 'horizontal'
  }

  get dangling() {
    return this.size % this.state.cols
  }

  get tabIndex() {
    return this.isEmpty ? null : STYLE.TABS[this.constructor.name]
  }

  setContainer = (container) => {
    this.container = container
  }

  fill() {
    const { dangling } = this
    if (!dangling) return

    return times(this.state.cols - dangling, (i) => (
      <li key={`filler-${i}`} className="filler tile click-catcher"/>
    ))
  }

  resize = () => {
    const { width } = bounds(this.container)

    this.setState({
      cols: Math.floor(width / (this.props.size * STYLE.TILE.FACTOR))
    })
  }


  static get isGrid() {
    return false
  }

  static get props() {
    return Object.keys(this.propTypes)
  }

  static propTypes = {
    size: number.isRequired
  }
}

module.exports = {
  Iterator
}