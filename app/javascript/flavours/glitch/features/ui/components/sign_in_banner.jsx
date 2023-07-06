import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { openModal } from 'flavours/glitch/actions/modal';
import { registrationsOpen, OMNIAUTH_ONLY, SIGN_IN_LINK } from 'flavours/glitch/initial_state';
import { useAppDispatch, useAppSelector } from 'flavours/glitch/store';

const SignInBanner = () => {
  const dispatch = useAppDispatch();

  const openClosedRegistrationsModal = useCallback(
    () => dispatch(openModal({ modalType: 'CLOSED_REGISTRATIONS' })),
    [dispatch],
  );

  let content;

  if(OMNIAUTH_ONLY) {
    content = (
      <>
      <a href={SIGN_IN_LINK} data-method="post" className='button button--block button-tertiary'>
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
    )
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
