class Blog < ActiveRecord::Base

  has_and_belongs_to_many :tags
  validates :title, :content, presence: true

end
