# frozen_string_literal: true

class InitialStatePresenter < ActiveModelSerializers::Model
  attributes :settings, :push_subscription, :token,
             :current_account, :admin, :owner, :text, :visibility,
             :disabled_account, :moved_to_account,
             :OMNIAUTH_ONLY, :REGISTRATIONS_REDIRECT_URI

  def role
    current_account&.user_role
  end
end
