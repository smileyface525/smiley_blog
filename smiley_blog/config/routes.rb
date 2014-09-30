Rails.application.routes.draw do
  resources :blogs
  namespace :admin do
    resources :sessions, only: [:index, :new, :create, :destroy]
  end
  resources :tags, only: [:index]
  root 'main#index'
end
