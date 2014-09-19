Rails.application.routes.draw do
  resources :blogs
  namespace :admin do
    resources :sessions, only: [:new, :create, :destroy]
  end
  root 'main#index'
end
