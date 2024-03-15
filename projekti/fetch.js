/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 *
 * @returns {Object} response json data
 */

const fetchData = async (url, options = {}) => {
  let jsonData;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      jsonData = await response.json();
    } else {
      // Jos vastaus ei ole JSON-muodossa, palauta tyhjä objekti
      console.error('fetchData() error: response is not in JSON format');
      jsonData = {};
    }
  } catch (error) {
    console.error('fetchData() error:', error);
    jsonData = {};
  }

  return jsonData;
};

export { fetchData };
