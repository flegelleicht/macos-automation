# mail-template

I needed a nice looking mail template and didn't want to work with mail templates in Apple Mail or anywhere. I hope it looks decent enough.

It currently only supports Gmail and needs an app password (which requires two facter authentication on your account, be safe).

Change variables before sending ;)

## Usage

`send.rb` uses environment variables to set the important bits

	MAILER_USER=<your gmail user> \
	MAILER_PASS=<your app password> \
	MAILER_RECEIVER=<the receiving mail address> \
	bundle exec ruby send.rb

## References

`face.png` is based on [jean wimmerlin's photo](https://unsplash.com/photos/YxDENE4HgMM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
