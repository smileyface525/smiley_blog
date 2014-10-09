Rails.application.routes.draw do
  namespace :admin do
    resources :sessions, only: [:index, :new, :create, :destroy]
  end
  resources :tags, only: [:index]
  resources :blogs do
    resources :tags, only: [:index]
  end
  root 'main#index'
end
