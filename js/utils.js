// PotentJS Adventure Creation Framework v20250708
// (c) 2025 Cyborg Unicorn Pty Ltd.
// This software is released under MIT License.

function htmlEncode(str_a)
{
	var strResult = '';

	if (str_a)
	{
		strResult = $('<div />').text(str_a).html();
	}

	return strResult;
}
