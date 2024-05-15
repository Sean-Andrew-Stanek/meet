import mockData from './mock-data';

/**
 * 
 * @param {*} events:
 * The following function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

// Getting the Access Token
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    // Outcome 1. No accessToken found in localstorage
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "https://do1hq8sag2.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getAccessToken(code);
    }
    return accessToken
};
/**
 * 
 * This function will fetch the list of all events
 */

export const getEvents = async () => {
    return mockData;
};