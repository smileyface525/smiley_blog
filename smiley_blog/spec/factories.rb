FactoryGirl.define do

  factory :tag do
    name "tag name"
  end

  factory :blog do
    title "blog title"
    content "hello. this is blog content"
  end

  factory :blog_with_tags, :parent => :blog do
    after(:create) do |blog|
      blog.tags << FactoryGirl.create(:tag)
    end
  end

  factory :tag_with_blogs, :parent => :tag do
    after(:create) do |tag|
      tag.blogs << FactoryGirl.create(:blog)
    end
  end

  factory :user do
    email 'fake@email.com'
    password 'fakepass'
  end

end