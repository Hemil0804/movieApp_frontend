import DOMPurify from 'dompurify'
const sanitizePayload = (data) => {
    if (Array.isArray(data)) {
        // If the data is an array, sanitize each item
        return data.map((item) => sanitizePayload(item))
    } else if (typeof data === 'object' && data !== null) {
        // If the data is an object, sanitize each property value
        const sanitizedData = {}
        for (const key in data) {
            // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty(key)) {
                sanitizedData[key] = sanitizePayload(data[key])
            }
        }
        return sanitizedData
    } else if (typeof data === 'boolean') {
        return data
    } 
    else if (typeof data === 'number') {
        return data
    }
     else {
        // For other data types (string, number, etc.), sanitize the value
        return DOMPurify.sanitize(data)
    }
}

export { sanitizePayload }
