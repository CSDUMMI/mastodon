import React from 'react';
import Logo from 'flavours/glitch/components/logo';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { registrationsOpen, me, OMNIAUTH_ONLY, REGISTRATIONS_REDIRECT_URI } from 'flavours/glitch/initial_state';
import Avatar from 'flavours/glitch/components/avatar';
import Permalink from 'flavours/glitch/components/permalink';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openModal } from 'flavours/glitch/actions/modal';

const Account = connect(state => ({
  account: state.getIn(['accounts', me]),
}))(({ account }) => (
  <Permalink href={account.get('url')} to={`/@${account.get('acct')}`} title={account.get('acct')}>
    <Avatar account={account} size={35} />
  </Permalink>
));

const mapDispatchToProps = (dispatch) => ({
  openClosedRegistrationsModal() {
    dispatch(openModal('CLOSED_REGISTRATIONS'));
  },
});

export default @connect(null, mapDispatchToProps)
@withRouter
class Header extends React.PureComponent {

  static contextTypes = {
    identity: PropTypes.object,
  };

  static propTypes = {
    openClosedRegistrationsModal: PropTypes.func,
    location: PropTypes.object,
  };

  render () {
    const { signedIn } = this.context.identity;
    const { location, openClosedRegistrationsModal } = this.props;

    let content;

    if(OMNIAUTH_ONLY && !signedIn) {
        content = (
          <>
          <a href='/auth/auth/openid_connect' data-method='post' rel='nofollow' className='button'><FormattedMessage id='sign_in_banner.sign_in_or_sign_up' defaultMessage='Login or Register' /></a>
          </>
        )


    } else {

      if (signedIn) {
        content = (
          <>
            {location.pathname !== '/publish' && <Link to='/publish' className='button'><FormattedMessage id='compose_form.publish' defaultMessage='Publish' /></Link>}
            <Account />
          </>
        );
      } else {
        content = (
          <>
            <a href="/auth/sign_in" className='button'><FormattedMessage id='sign_in_banner.sign_in' defaultMessage='Sign in' /></a>
            <a href={registrationsOpen ? "/auth/sign_up" : 'https://joinmastodon.org/servers'} className='button button-tertiary'><FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' /></a>
          </>
        );
      }
    }

    return (
      <div className='ui__header'>
        <Link to='/' className='ui__header__logo'><Logo /></Link>

        <div className='ui__header__links'>
          {content}
        </div>
      </div>
    );
  }

}
