import regions from "../../regions.json";

export default regions.features;

export const exampleOrigin = {
  center: [-122.340108, 47.6081985],
  context: [
    { id: "neighborhood.2101930", text: "Downtown" },
    { id: "postcode.14893930833141600", text: "98101" },
    { id: "place.6907264716229470", text: "Seattle", wikidata: "Q5083" },
    {
      id: "district.9122689011421610",
      text: "King County",
      wikidata: "Q108861",
    },
    {
      id: "region.9713796497246050",
      short_code: "US-WA",
      text: "Washington",
      wikidata: "Q1223",
    },
    {
      id: "country.19678805456372290",
      short_code: "us",
      text: "United States",
      wikidata: "Q30",
    },
  ],
  geometry: { coordinates: [-122.340108, 47.6081985], type: "Point" },
  id: "poi.1228360682879",
  place_name:
    "Gum Wall, 1428 Post Aly, Seattle, Washington 98101, United States",
  place_type: ["poi"],
  properties: {
    address: "1428 Post Aly",
    category: "monument, landmark, historic",
    foursquare: "4a9c40a2f964a520953620e3",
    landmark: true,
    wikidata: "Q3120784",
  },
  relevance: 1,
  text: "Gum Wall",
  type: "Feature",
};
export const exampleDestination = {
  center: [-122.341629, 47.6092975],
  context: [
    { id: "neighborhood.2101930", text: "Downtown" },
    { id: "postcode.14893930833141600", text: "98101" },
    { id: "place.6907264716229470", text: "Seattle", wikidata: "Q5083" },
    {
      id: "district.9122689011421610",
      text: "King County",
      wikidata: "Q108861",
    },
    {
      id: "region.9713796497246050",
      short_code: "US-WA",
      text: "Washington",
      wikidata: "Q1223",
    },
    {
      id: "country.19678805456372290",
      short_code: "us",
      text: "United States",
      wikidata: "Q30",
    },
  ],
  geometry: { coordinates: [-122.341629, 47.6092975], type: "Point" },
  id: "poi.506806173791",
  place_name:
    "Pike Place Market, 85 Pike St, Seattle, Washington 98101, United States",
  place_type: ["poi"],
  properties: {
    address: "85 Pike St",
    category: "farmers market, farmers, market",
    foursquare: "427ea800f964a520b1211fe3",
    landmark: true,
    wikidata: "Q1373418",
  },
  relevance: 1,
  text: "Pike Place Market",
  type: "Feature",
};
