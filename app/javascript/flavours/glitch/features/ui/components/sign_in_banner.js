import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { registrationsOpen, OMNIAUTH_ONLY, REGISTRATIONS_REDIRECT_URI } from 'flavours/glitch/initial_state';
import { openModal } from 'flavours/glitch/actions/modal';

const SignInBanner = () => {
  const dispatch = useDispatch();

  const openClosedRegistrationsModal = useCallback(
    () => dispatch(openModal('CLOSED_REGISTRATIONS')),
    [dispatch],
  );

  let signupButton;
  let signupLink = OMNIAUTH_ONLY ? REGISTRATIONS_REDIRECT_URI : "/auth/sign_up"
  let signinLink = OMNIAUTH_ONLY ? "/auth/auth/openid_connect" : "/auth/sign_in"

  console.log(OMNIAUTH_ONLY)
  console.log(REGISTRATIONS_REDIRECT_URI)
  console.log(signupLink)
  console.log(signinLink)

  if (registrationsOpen) {
    signupButton = (
      <a href='{signupLink}' className='button button--block button-tertiary'>
        <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
      </a>
    );
  } else {
    signupButton = (
      <button className='button button--block button-tertiary' onClick={openClosedRegistrationsModal}>
        <FormattedMessage id='sign_in_banner.create_account' defaultMessage='Create account' />
      </button>
    );
  }

  return (
    <div className='sign-in-banner'>

      <p><FormattedMessage id='sign_in_banner.text' defaultMessage='Sign in to follow profiles or hashtags, favourite, share and reply to posts, or interact from your account on a different server.' /></p>
      <a href='{signinLink}' className='button button--block'><FormattedMessage id='sign_in_banner.sign_in' defaultMessage='Sign in' /></a>
      {signupButton}
    </div>
  );
};

export default SignInBanner;
