export function getTimeDifference(startTime, endTime) {
  // Split the time strings into hours and minutes
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  // Convert the start and end times to minutes
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference in minutes
  let differenceInMinutes = startTotalMinutes - endTotalMinutes;

  // If the difference is negative, adjust it to represent time difference correctly
  if (differenceInMinutes < 0) {
    differenceInMinutes += 24 * 60; // Add 24 hours in minutes (handle cases like "00:30" - "23:45")
  }

  // Convert the difference back to hours and minutes
  const diffHours = Math.floor(differenceInMinutes / 60);
  const diffMinutes = differenceInMinutes % 60;

  // Format the result as hh:mm, ensuring two digits for both hours and minutes
  return `${String(diffHours).padStart(2, "0")}:${String(diffMinutes).padStart(
    2,
    "0"
  )}`;
}

export function formatRondaDateCreated(dateString) {
  // Convert the ISO string to a Date object
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Return the formatted date as "YYYY - MM - DD"
  return `${year} - ${month} - ${day}`;
}

export const formatHoraRonda = (dateString) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString).toLocaleString("en-GB", options);
};
