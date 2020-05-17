export const filterCompetitions = (id, competitions) => {
  let filteredCompetitions = competitions.filter(function (competition) {
    const equal = competition.area.id === id;

    return equal;
  });
  return filteredCompetitions;
};
