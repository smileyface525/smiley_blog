class Blog < ActiveRecord::Base

  has_and_belongs_to_many :tags
  validates :title, :content, presence: true

  def self.recent
    order(:updated_at).limit(7)
  end

  def self.with(tag_name)
    includes(:tags).where(tags: {name: tag_name})
  end

end
