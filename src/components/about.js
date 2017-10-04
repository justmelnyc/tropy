'use strict'

const React = require('react')
const { PureComponent } = React
const { FormattedMessage, injectIntl, intlShape } = require('react-intl')
const { shell } = require('electron')
const { version } = require('../common/release')
const { bool, func } = require('prop-types')
const { Toolbar } = require('./toolbar')


class About extends PureComponent {
  renderLink(id, ...options) {
    const { intl } = this.props

    const url = intl.formatMessage({ id: `${id}.url` }, ...options)
    const title = intl.formatMessage({ id: `${id}.title` }, ...options)

    return (
      // eslint-disable-next-line react/jsx-no-bind
      <a onClick={() => shell.openExternal(url)}>{title}</a>
    )
  }

  renderToolbar() {
    return this.props.showToolbar && (
      <Toolbar onDoubleClick={this.props.onToolbarDoubleClick}/>
    )
  }

  render() {
    return (
      <div className="about">
        {this.renderToolbar()}

        <FormattedMessage id="about.tropy"/>

        <span className="version">{version}</span>

        <FormattedMessage
          id="about.text"
          values={{ rrchnm: this.renderLink('about.rrchnm') }}/>
        <FormattedMessage
          id="about.trademark"
          values={{ cds: this.renderLink('about.cds') }}/>

        {this.renderLink('about.release', { version })}
        {this.renderLink('about.license')}
        {this.renderLink('about.credits')}

      </div>
    )
  }

  static propTypes = {
    intl: intlShape.isRequired,
    showToolbar: bool.isRequired,
    onToolbarDoubleClick: func
  }

  static defaultProps = {
    showToolbar: ARGS.frameless
  }
}

module.exports = {
  About: injectIntl(About)
}
