function generateFireEmailContent({ label, confidence, personCount, cameraLocationID }) {
    const greeting = "Dear Team,";
    const body = `
We have detected a critical event at one of the monitored locations.

Event Details:
- Detected Label: ${label}
- Confidence: ${confidence}%
- Number of People Present: ${personCount || "Data not available"}
- Camera Location ID: ${cameraLocationID}

Please take immediate action to assess the situation and ensure safety.

   Best regards,
   Safety Management System
    `;

    return `${greeting}\n\n${body}`;
}

module.exports = generateFireEmailContent;

