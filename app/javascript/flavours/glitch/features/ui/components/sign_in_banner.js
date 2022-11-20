/**
 *  Sign in banner is only used in three-column  view of the web page.
 * For the sign in and sign up buttons in the single column view, see header.js in this same folder.
 */
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { registrationsOpen, OMNIAUTH_ONLY } from 'flavours/glitch/initial_state';
import { openModal } from 'flavours/glitch/actions/modal';

const SignInBanner = () => {
  const dispatch = useDispatch();

  const openClosedRegistrationsModal = useCallback(
    () => dispatch(openModal('CLOSED_REGISTRATIONS')),
    [dispatch],
  );

  let content;

  if(OMNIAUTH_ONLY) {
    content = (
      <>
      <a href='/auth/auth/openid_connect' className='button button--block button-tertiary'>
        <FormattedMessage id='sign_in_banner.sign_in_or_sign_up' defaultMessage="Login or Register" />
      </a>
      </>
    );
  } else {

    let signupButton;

    if (registrationsOpen) {
      signupButton = (
        <>
        <a href='/auth/sign_up' className='button button--block button-tertiary'>
          <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
        </a>
        </>
      );
    } else {
      signupButton = (
        <>
        <button className='button button--block button-tertiary' onClick={openClosedRegistrationsModal}>
          <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
        </button>
        </>
      );
    }

    content = (
        <>
        <a href='/auth/sign_in' className='button button--block'>
          <FormattedMessage id="sign_in_banner.sign_in" defaultMessage='Sign in' />
        </a>
        {signupButton}
        </>
    );
  }

  return (
    <>
    <div className='sign-in-banner'>
      <p><FormattedMessage id='sign_in_banner.text' defaultMessage='Sign in to follow profiles or hashtags, favourite, share and reply to posts, or interact from your account on a different server.' />
      </p>
     {content}
    </div>
    </>
  );
};

export default SignInBanner;
