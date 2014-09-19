class Admin::SessionsController < ApplicationController

  def new
  end

  def create
    user = params[:user] ? User.find_by_email(params[:user][:email]) : []
    if user.present? && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      @user = User.new
      render :new
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end

end