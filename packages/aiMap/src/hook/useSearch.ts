export const useSearch = (map, { emit }) => {
  const getSearchResult = async (text) => {
    return new Promise((resolve) => {
      let places
      const searching = new aimap.PlaceSearch()
      searching.search(text, (error, result) => {
        places = result.places
        resolve(places)
      })
    })
  }

  return { getSearchResult }
}
