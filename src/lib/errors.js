const errorDomains = [
    { code: "00", description: "Landing" },
    { code: "01", description: "Login" },
    { code: "02", description: "Register" },
    { code: "03", description: "Email Veirication"}
]

const errorEntity = [
    { code: "1", description: "Information"},
    { code: "2", description: "Success"},
    { code: "4", description: "Client"},
    { code: "5", description: "Server"},
]

const errorCodes = [
    { code: "000", description: "General error" },
    { code: "001", description: "Connection timeout" },
    { code: "002", description: "Invalid credentials" },
    { code: "003", description: "Data not found" },
    { code: "004", description: "Access denied" },
    { code: "005", description: "Input validation failed" },
    { code: "006", description: "Server overloaded" },
    { code: "007", description: "Database connection lost" },
    { code: "008", description: "File not writable" },
    { code: "009", description: "Invalid file format" },
    { code: "010", description: "Resource not available" },
    { code: "011", description: "Unexpected error" },
    { code: "012", description: "File upload failed" },
    { code: "013", description: "Invalid request" },
    { code: "014", description: "Server maintenance" },
    { code: "015", description: "Authentication failed" },
    { code: "016", description: "Insufficient permissions" },
    { code: "017", description: "Data corruption" },
    { code: "018", description: "Timeout waiting for response" },
    { code: "019", description: "Out of memory" },
    { code: "020", description: "File not readable" },
    { code: "021", description: "Invalid URL" },
    { code: "022", description: "Invalid API key" },
    { code: "023", description: "Invalid parameter" },
    { code: "024", description: "Server unreachable" },
    { code: "025", description: "Session expired" },
    { code: "026", description: "Invalid token" },
    { code: "027", description: "Permission denied" },
    { code: "028", description: "Server error" },
    { code: "029", description: "Unexpected response" },
    { code: "030", description: "Disk full" },
    { code: "031", description: "Unknown User" },
    { code: "032", description: "User already exist" },
    { code: "033", description: "Unknown Post" },
    { code: "034", description: "Missing Form Data" },
    { code: "035", description: "New login location detected, please check your email."},
    { code: "036", description: "Malformed Email" },
    { code: "037", description: "Malformed Username" },
    { code: "038", description: "Malformed Password" },
    { code: "039", description: "Passwords aren't the same." },
    { code: "040", description: "Email already in use" },
    { code: "041", description: "Invalid Birthdate" },
];

export function get_full_error_description(code) {
    const parts=code.split(".")
    return "Error on "+errorEntity.find(item => item.code === parts[1]).description+" on endpoint /"+errorDomains.find(item => item.code === parts[0]).description.toLowerCase()+" : "+errorCodes.find(item => item.code === parts[2]).description
}

export function short_error(code) {
    const parts=code.split(".")
    return errorCodes.find(item => item.code === parts[2]).description
}
