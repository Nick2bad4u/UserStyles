gh api `
	-H "Accept: application/vnd.github+json" `
	/repos/nick2bad4u/fitfileviewer/code-scanning/alerts `
	--paginate `
	-q '.[] | select(.state=="open") | .number' |
ForEach-Object -Parallel {
	gh api `
		-X PATCH `
		-H "Accept: application/vnd.github+json" `
		/repos/nick2bad4u/fitfileviewer/code-scanning/alerts/$($_) `
		-f state=dismissed `
		-f dismissed_reason="won't fix" `
		-f dismissed_comment="Bulk dismissed via script"
} -ThrottleLimit 8
