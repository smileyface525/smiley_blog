class Admin::SessionsController < ApplicationController

  def index
    render json: current_user
  end

  def create
    user = params[:user] ? User.find_by_email(params[:user][:email]) : []
    if user.present? && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      # redirect_to root_path
      render json: user
    else
      render json: {notFound: true}
    end
  end

  def destroy
    session.clear
    render json: {loggedOut: true}
  end

end