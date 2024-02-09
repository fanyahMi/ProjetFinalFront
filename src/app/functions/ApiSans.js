class ApiSans {
  static async fetch(url, method = 'GET', headers = {}) {
    try {
      const response = await fetch(url, {
        method
      });
      const content = await response.json();
      return content;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
    }
  }
}

export default ApiSans;
