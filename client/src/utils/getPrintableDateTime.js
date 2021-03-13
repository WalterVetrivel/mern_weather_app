export const getPrintableDateTime = dateTime => {
	const dateString = new Date(dateTime)
		.toString()
		.split(' ')
		.slice(0, 3)
		.join(' ');
	const hours = new Date(dateTime).getHours();
	const timeString = `${hours % 12 !== 0 ? hours % 12 : '12'} ${
		hours <= 12 ? 'AM' : 'PM'
	}`;

	return {
		dateString,
		timeString,
	};
};
