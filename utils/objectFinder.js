import Courses from '../models/Courses.js';

// Function to find courses based on given filter and value
// Returns an array of matching courses or the entire course list if no filter is provided
const findCourse = (filter = null, value = null) => {
	const result = [];

	// Check if the filter is 'title' or 'tutor'
	if (filter == 'title' || filter == 'tutor') {
		// Iterate through the Courses array
		for (var course of Courses) {
			// Check if the value matches the course title or tutor (case-insensitive)
			if (course[filter].toLowerCase() === value.toLowerCase()) {
				result.push(course);
			}
		}
	}
	// Check if the filter is 'price' or 'duration'
	else if (filter == 'price' || filter == 'duration') {
		// Iterate through the Courses array
		for (var course of Courses) {
			// Check if the course price or duration is less than or equal to the given value
			if (course[filter] <= value) {
				result.push(course);
			}
		}
	}
	// If no filter is provided, return the entire Courses array
	else {
		return Courses;
	}
	// Return the result array
	return result;
};

export { findCourse };
