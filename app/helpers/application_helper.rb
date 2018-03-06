module ApplicationHelper
  def format_posted_time(time)
    return time unless time
    time.strftime("%Y/%m/%d %H:%M")
  end
end
