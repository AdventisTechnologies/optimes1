// utils/emailContent.js
function generateEmailContent({ personName, isUnknown, missingItems, cameraLocationID }) {
    const itemStatus = missingItems
        .map(item => `- ${item.name}: ${item.isPresent ? 'Present' : 'Missing'}`)
        .join('\n');

    const greeting = isUnknown
        ? "Hello,"
        : `Hello,`;  // Include the person's name here
    // const sub= 'SAFETY MANAGEMENT'
    const body = isUnknown
        ? `A PPE kit was found for an unknown person, but some required items are missing:`
        : `A PPE kit has been detected with missing items:`;

    const footer = `
Please ensure all the required PPE items are provided.

    Regards,
    Safety Management System`;

    // Optionally include Camera Location ID if needed in the footer or body
    const cameraInfo = cameraLocationID ? `Camera Location Id: ${cameraLocationID}` : '';
    const personInfo = personName ? `Employee Id : ${personName}` : '';

    return `${greeting}\n\n${body}\n\n${personInfo}\n\n${cameraInfo}\n\n${itemStatus}\n\n${footer}`;
}

// Ensure it's exported correctly
module.exports = generateEmailContent;

