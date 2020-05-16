export const filterCountries = (countries, competitions) => {
  const filteredCountries = [];
  countries.map((country) => {
    competitions.map((competition) => {
      let valueExists = filteredCountries.find(
        (el) => el[0] === competition.area.id
      );
      if (country.id === competition.area.id) {
        console.log(valueExists);
        filteredCountries.push(country);
      }
    });
  });

  return filteredCountries;
};
