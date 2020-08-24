import React, { Component } from 'react'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import classNames from 'classnames'
import styles from './styles.module.sass'

const MAILCHIMP_LIST_URL =
  '//e-conomy.us4.list-manage.com/subscribe/post?u=514179fa72a21190e8d35215&id=be6de28b15'

class CustomForm extends Component {
  state = {
    email: '',
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({ email: e.target.value })
  }
  render() {
    const { subscribe, status, message } = this.props
    return (
      <div className={styles.customForm}>
        <form>
          <input
            type="email"
            onChange={this.handleChange}
            placeHolder="Email Address"
            className={classNames(styles.emailInput, {
              sending: status === 'sending',
            })}
          />
          {this.state.email && (
            <button onClick={() => subscribe({ email: this.state.email })} />
          )}
        </form>
        {status === 'error' && (
          <div
            style={{ color: 'red' }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === 'success' && (
          <div style={{ color: 'green' }}>Subscribed !</div>
        )}
      </div>
    )
  }
}
const EmailSignupButton = () => (
  <div>
    <MailchimpSubscribe
      url={MAILCHIMP_LIST_URL}
      render={props => <CustomForm {...props} />}
    />
  </div>
)

export default EmailSignupButton
