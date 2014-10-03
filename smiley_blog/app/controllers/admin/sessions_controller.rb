class Admin::SessionsController < ApplicationController

  def index
    render json: current_user
  end

  def new

  end

  def create
    user = params[:user] ? User.find_by_email(params[:user][:email]) : []
    if user.present? && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      # redirect_to root_path
      render json: user
    else
      render json: {msg: "Login failed. Please try again."}, status: :unprocessable_entity
    end
  end

  def destroy
    session.clear
    render json: nil
  end

end