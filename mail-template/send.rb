#!/usr/bin/env bundle exec ruby
require 'mail'

gmail_user  = ENV['MAILER_USER']
gmail_pass  = ENV['MAILER_PASS']
sender      = gmail_user
receiver    = ENV['MAILER_RECEIVER']

subject = "YOUR SUBJECT"
body = <<~EOB
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
EOB

html_body = File.read('index.html')
              .sub('{{{SUBJECT}}}', subject)
              .sub('{{{BODY}}}', "<p>#{body.split("\n\n").join('</p><p>')}</p>")

options = {
  :address              => 'smtp.gmail.com',
  :port                 => '587',
  :enable_starttls_auto => true,
  :user_name            => gmail_user,
  :password             => gmail_pass,
  :authentication       => :plain,
  :domain               => "localhost.localdomain"
}

Mail.defaults do
  delivery_method :smtp, options
end

Mail.deliver do
  to receiver
  from sender
  subject subject
  add_file './face.png'
  face = attachments['face.png']
  
  text_part do
    body body
  end
  
  html_part do
    content_type 'text/html; charset=UTF-8'
    body html_body.sub('{{{CID}}}', "#{face.cid}")
  end
end
