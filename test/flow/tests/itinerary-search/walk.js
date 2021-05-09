module.exports = {
  tags: ['walk'],
  'Walk in the park': browser => {
    browser.url(browser.launch_url);

    browser.page
      .searchFields()
      .itinerarySearch('Helsingin rautatieasema', 'Kaisaniemen puisto');

    browser.page.itinerarySummary().waitForFirstItineraryRow();

    const customizeSearch = browser.page.customizeSearch();
    customizeSearch.openQuickSettings();
    customizeSearch.disableAllModalitiesExcept('');

    browser.page.itinerarySummary().waitForItineraryRowOfType('walk');

    browser.end();
  },
};
