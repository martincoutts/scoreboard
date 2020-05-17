// const filterCompetitions = () => {
//   let selectedCountryId = parseInt(this.state.selectedCountryId);
//   let filteredCompetitions = this.state.competitions.filter(function (
//     competition
//   ) {
//     return competition.area.id === selectedCountryId;
//   });
//   this.setState({
//     filteredCompetitions,
//   });
// };

export const filterCompetitions = (id, competitions) => {
  let filteredCompetitions = competitions.filter(function (competition) {
    return competition.area.id === id;
  });

  return filteredCompetitions;
};
