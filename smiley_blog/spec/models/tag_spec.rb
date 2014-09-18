require 'spec_helper'

describe Tag do

  describe "association" do
    it { should have_and_belong_to_many :blogs}
  end

  describe "validation" do
    it { should validate_presence_of :name }
  end

end

