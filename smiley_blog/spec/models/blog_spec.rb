require 'spec_helper'

describe Blog do

  describe "association" do
    it { should have_and_belong_to_many :tags }
  end

  describe "validation" do
    it { should validate_presence_of :title }
    it { should validate_presence_of :content }
  end

end

