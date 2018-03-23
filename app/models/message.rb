class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :body, presence: true, unless: :image?

  mount_uploader :image, ImageUploader

  scope :compare_message_id, ->(message_id) { where("id > ?", message_id) }
end
