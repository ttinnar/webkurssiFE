/**
 * Fetches JSON data from APIs
 *
 * @param {string} url - api endpoint url
 * @param {Object} options - request options
 *
 * @returns {Object} response json data
 */

const serverUrl = 'https://trdns.northeurope.cloudapp.azure.com';

const fetchData = async (url, options = {}) => {
  let jsonData;
  try {
    const response = await fetch(serverUrl + url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    jsonData = await response.json();
  } catch (error) {
    console.error('fetchData() error', error);
    jsonData = {};
  }
  //console.log(jsonData);
  return jsonData;
};

export { fetchData };