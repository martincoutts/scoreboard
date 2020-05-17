export const filterCountries = (countries, competitions) => {
  const filteredCountries = [];

  countries.map((country) => {
    competitions.map((competition) => {
      const valueExists = filteredCountries.some(
        (el) => el.id === competition.area.id
      );

      if (country.id === competition.area.id && valueExists === false) {
        filteredCountries.push(country);
      }
    });
  });

  return filteredCountries;
};
