/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('attractions').del();

  // Inserts new seed entries
  await knex('attractions').insert([
    {
      id: 1,
      name: 'Eiffel Tower',
      imageUrl: 'https://en.wikipedia.org/wiki/Eiffel_Tower#/media/File:Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',
      userRating: 4.8,
    },
    {
      id: 2,
      name: 'Statue of Liberty',
      imageUrl: 'https://en.wikipedia.org/wiki/Statue_of_Liberty#/media/File:Front_view_of_Statue_of_Liberty_with_pedestal_and_base_2024.jpg',
      userRating: 4.7,
    },
    {
      id: 3,
      name: 'Shibuya Crossing',
      imageUrl: 'https://en.wikipedia.org/wiki/Shibuya_Crossing#/media/File:Shibuya_scramble_crossing_during_Halloween_2023,_actually_less_crowded_than_usual,_high_police_presence_2.jpg',
      userRating: 4.5,
    },
    {
      id: 4,
      name: 'Sydney Harbour Bridge',
      imageUrl: 'https://en.wikipedia.org/wiki/Sydney_Harbour_Bridge#/media/File:Sydney_(AU),_Harbour_Bridge_--_2019_--_2179.jpg',
      userRating: 4.9,
    },
  ])
}
