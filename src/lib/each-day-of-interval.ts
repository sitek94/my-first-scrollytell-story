export const eachDayOfInterval = ({ start, end }: { start: Date; end: Date }) => {
	const dates = [];

	const endTimestamp = end.getTime();
	let currentDate = start;

	while (currentDate.getTime() < endTimestamp) {
		dates.push(currentDate);
		currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
	}

	return dates;
};
