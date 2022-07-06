import './App.css';

import { useState, useRef } from 'react';

import GameSpace from "./components/GameSpace.js"

var pokemonlist = ['Absol', 'Accelgor', 'Aggron', 'Aipom', 'Alakazam', 'Alcremie', 'Altaria', 'Amaura', 'Ambipom', 'Ampharos', 'Anorith', 'Appletun', 'Applin', 'Arbok', 'Arcanine', 'Arceus', 'Archen', 'Archeops', 'Ariados', 'Armaldo', 'Arrokuda', 'Articuno', 'Audino', 'Aurorus', 'Avalugg', 'Azelf', 'Azurill', 'Bagon', 'Baltoy', 'Banette', 'Barboach', 'Basculin', 'Bayleef', 'Beartic', 'Beedrill', 'Beheeyem', 'Beldum', 'Bergmite', 'Bewear', 'Bibarel', 'Bidoof', 'Binacle', 'Bisharp', 'Blaziken', 'Blipbug', 'Blissey', 'Blitzle', 'Boldore', 'Boltund', 'Bonsly', 'Braixen', 'Braviary', 'Breloom', 'Brionne', 'Bronzong', 'Bronzor', 'Bruxish', 'Budew', 'Buizel', 'Buneary', 'Bunnelby', 'Burmy', 'Buzzwole', 'Cacnea', 'Cacturne', 'Calyrex', 'Camerupt', 'Carbink', 'Carkol', 'Carvanha', 'Cascoon', 'Castform', 'Caterpie', 'Celebi', 'Chansey', 'Chatot', 'Cherrim', 'Cherubi', 'Chespin', 'Chewtle', 'Chimchar', 'Chimecho', 'Chinchou', 'Cinccino', 'Clamperl', 'Claydol', 'Clefable', 'Clefairy', 'Cleffa', 'Cloyster', 'Cobalion', 'Combee', 'Comfey', 'Corphish', 'Corsola', 'Cosmoem', 'Cosmog', 'Cottonee', 'Cradily', 'Cranidos', 'Croagunk', 'Crobat', 'Croconaw', 'Crustle', 'Cubchoo', 'Cubone', 'Cufant', 'Cursola', 'Cutiefly', 'Darkrai', 'Dartrix', 'Darumaka', 'Dedenne', 'Deerling', 'Deino', 'Delcatty', 'Delibird', 'Delphox', 'Deoxys', 'Dewgong', 'Dewott', 'Dewpider', 'Dhelmise', 'Dialga', 'Diancie', 'Diglett', 'Ditto', 'Dodrio', 'Doduo', 'Donphan', 'Dottler', 'Doublade', 'Dragalge', 'Drakloak', 'Drampa', 'Drapion', 'Dratini', 'Drednaw', 'Dreepy', 'Drifblim', 'Drifloon', 'Drilbur', 'Drizzile', 'Drowzee', 'Dubwool', 'Ducklett', 'Dugtrio', 'Duosion', 'Durant', 'Dusclops', 'Dusknoir', 'Duskull', 'Dustox', 'Dwebble', 'Eevee', 'Eiscue', 'Ekans', 'Eldegoss', 'Elekid', 'Elgyem', 'Emboar', 'Emolga', 'Empoleon', 'Entei', 'Espeon', 'Espurr', 'Exploud', 'Falinks', 'Fearow', 'Feebas', 'Fennekin', 'Finneon', 'Flaaffy', 'Flabebe', 'Flapple', 'Flareon', 'Floatzel', 'Floette', 'Florges', 'Flygon', 'Fomantis', 'Foongus', 'Fraxure', 'Frillish', 'Froakie', 'Froslass', 'Frosmoth', 'Furfrou', 'Furret', 'Gabite', 'Gallade', 'Garbodor', 'Garchomp', 'Gastly', 'Genesect', 'Gengar', 'Geodude', 'Gible', 'Gigalith', 'Giratina', 'Glaceon', 'Glalie', 'Glameow', 'Gligar', 'Gliscor', 'Gloom', 'Gogoat', 'Golbat', 'Goldeen', 'Golduck', 'Golem', 'Golett', 'Golurk', 'Goodra', 'Goomy', 'Gorebyss', 'Gothita', 'Granbull', 'Graveler', 'Greedent', 'Greninja', 'Grimer', 'Grookey', 'Grotle', 'Groudon', 'Grovyle', 'Grubbin', 'Grumpig', 'Gulpin', 'Gumshoos', 'Gurdurr', 'Guzzlord', 'Gyarados', 'Hakamoo', 'Happiny', 'Hariyama', 'Hatenna', 'Hattrem', 'Haunter', 'Hawlucha', 'Haxorus', 'Heatmor', 'Heatran', 'Herdier', 'Honedge', 'Hoopa', 'Hoothoot', 'Hoppip', 'Horsea', 'Houndoom', 'Houndour', 'Huntail', 'Hypno', 'Illumise', 'Impidimp', 'Indeedee', 'Inkay', 'Inteleon', 'Ivysaur', 'Jangmoo', 'Jirachi', 'Jolteon', 'Joltik', 'Jumpluff', 'Kabuto', 'Kabutops', 'Kadabra', 'Kakuna', 'Kartana', 'Kecleon', 'Keldeo', 'Kingdra', 'Kingler', 'Kirlia', 'Klang', 'Klefki', 'Klink', 'Koffing', 'Komala', 'Kommoo', 'Krabby', 'Krokorok', 'Kubfu', 'Kyogre', 'Kyurem', 'Lairon', 'Lampent', 'Landorus', 'Lanturn', 'Lapras', 'Larvesta', 'Larvitar', 'Latias', 'Latios', 'Leafeon', 'Leavanny', 'Ledian', 'Ledyba', 'Liepard', 'Lileep', 'Lillipup', 'Linoone', 'Litleo', 'Litten', 'Litwick', 'Lombre', 'Lopunny', 'Lotad', 'Loudred', 'Lucario', 'Ludicolo', 'Lugia', 'Lumineon', 'Lunala', 'Lunatone', 'Lurantis', 'Luvdisc', 'Luxio', 'Luxray', 'Lycanroc', 'Machamp', 'Machoke', 'Machop', 'Magby', 'Magcargo', 'Magearna', 'Magikarp', 'Magmar', 'Magneton', 'Makuhita', 'Malamar', 'Manaphy', 'Mankey', 'Mantine', 'Mantyke', 'Maractus', 'Mareanie', 'Mareep', 'Marill', 'Marowak', 'Mawile', 'Medicham', 'Meditite', 'Meganium', 'Melmetal', 'Meloetta', 'Meltan', 'Meowstic', 'Meowth', 'Mesprit', 'Metang', 'Metapod', 'Mewtwo', 'Mienfoo', 'Mienshao', 'Milcery', 'Milotic', 'Miltank', 'MimeJr', 'Mimikyu', 'Minccino', 'Minior', 'Minun', 'Moltres', 'Monferno', 'Morelull', 'Morgrem', 'Morpeko', 'Mothim', 'MrMime', 'MrRime', 'Mudbray', 'Mudkip', 'Mudsdale', 'Munchlax', 'Munna', 'Murkrow', 'Musharna', 'Necrozma', 'Nickit', 'Nidoking', 'Nidoran', 'Nidoran', 'Nidorina', 'Nidorino', 'Nihilego', 'Nincada', 'Ninjask', 'Noctowl', 'Noibat', 'Noivern', 'Nosepass', 'Numel', 'Nuzleaf', 'Oddish', 'Omanyte', 'Omastar', 'Oranguru', 'Orbeetle', 'Oricorio', 'Oshawott', 'Palkia', 'Pancham', 'Pangoro', 'Panpour', 'Pansage', 'Pansear', 'Paras', 'Parasect', 'Patrat', 'Pawniard', 'Pelipper', 'Persian', 'Petilil', 'Phanpy', 'Phantump', 'Phione', 'Pichu', 'Pidgeot', 'Pidgey', 'Pidove', 'Pignite', 'Pikachu', 'Pikipek', 'Pineco', 'Pinsir', 'Piplup', 'Plusle', 'Poipole', 'Politoed', 'Poliwag', 'Ponyta', 'Popplio', 'Porygon', 'PorygonZ', 'Primeape', 'Prinplup', 'Psyduck', 'Pupitar', 'Purrloin', 'Purugly', 'Pyroar', 'Quagsire', 'Quilava', 'Qwilfish', 'Raboot', 'Raichu', 'Raikou', 'Ralts', 'Rapidash', 'Raticate', 'Rattata', 'Rayquaza', 'Regice', 'Regirock', 'Remoraid', 'Reshiram', 'Rhydon', 'Rhyhorn', 'Ribombee', 'Riolu', 'Rockruff', 'Rolycoly', 'Rookidee', 'Roselia', 'Roserade', 'Rotom', 'Rowlet', 'Rufflet', 'Sableye', 'Salandit', 'Salazzle', 'Samurott', 'Sandile', 'Sawsbuck', 'Sceptile', 'Scizor', 'Scrafty', 'Scraggy', 'Scyther', 'Seadra', 'Seaking', 'Sealeo', 'Seedot', 'Sentret', 'Servine', 'Seviper', 'Sewaddle', 'Sharpedo', 'Shaymin', 'Shedinja', 'Shelgon', 'Shellder', 'Shellos', 'Shelmet', 'Shieldon', 'Shiftry', 'Shinx', 'Shuckle', 'Shuppet', 'Sigilyph', 'Silcoon', 'Silvally', 'Simipour', 'Simisage', 'Simisear', 'Sinistea', 'Skarmory', 'Skiddo', 'Skiploom', 'Skitty', 'Skorupi', 'Skrelp', 'Skuntank', 'Skwovet', 'Slaking', 'Slakoth', 'Sliggoo', 'Slowbro', 'Slowking', 'Slowpoke', 'Slugma', 'Slurpuff', 'Smeargle', 'Smoochum', 'Sneasel', 'Snivy', 'Snorlax', 'Snorunt', 'Snover', 'Snubbull', 'Sobble', 'Solgaleo', 'Solosis', 'Solrock', 'Spearow', 'Spewpa', 'Spheal', 'Spinarak', 'Spinda', 'Spoink', 'Spritzee', 'Squirtle', 'Stantler', 'Staravia', 'Starly', 'Starmie', 'Staryu', 'Steelix', 'Steenee', 'Stufful', 'Stunfisk', 'Stunky', 'Suicune', 'Sunflora', 'Sunkern', 'Surskit', 'Swablu', 'Swadloon', 'Swalot', 'Swampert', 'Swanna', 'Swellow', 'Swinub', 'Swirlix', 'Swoobat', 'Sylveon', 'Taillow', 'Tangela', 'TapuBulu', 'TapuFini', 'TapuKoko', 'TapuLele', 'Tauros', 'Tepig', 'Thievul', 'Throh', 'Thwackey', 'Timburr', 'Tirtouga', 'Togekiss', 'Togepi', 'Togetic', 'Torchic', 'Torkoal', 'Tornadus', 'Torracat', 'Torterra', 'Totodile', 'Toxapex', 'Toxel', 'Trapinch', 'Treecko', 'Tropius', 'Trubbish', 'Trumbeak', 'Tsareena', 'Turtwig', 'Tympole', 'Tynamo', 'TypeNull', 'Tyrogue', 'Tyrunt', 'Umbreon', 'Unfezant', 'Unown', 'Ursaring', 'Urshifu', 'Vaporeon', 'Venipede', 'Venomoth', 'Venonat', 'Venusaur', 'Vibrava', 'Victini', 'Vigoroth', 'Vikavolt', 'Virizion', 'Vivillon', 'Volbeat', 'Voltorb', 'Vullaby', 'Vulpix', 'Wailmer', 'Wailord', 'Walrein', 'Watchog', 'Weavile', 'Weedle', 'Weezing', 'Whiscash', 'Whismur', 'Wimpod', 'Wingull', 'Woobat', 'Wooloo', 'Wooper', 'Wormadam', 'Wurmple', 'Wynaut', 'Xerneas', 'Yamask', 'Yamper', 'Yanma', 'Yanmega', 'Yungoos', 'Yveltal', 'Zacian', 'Zangoose', 'Zapdos', 'Zarude', 'Zekrom', 'Zeraora', 'Zoroark', 'Zorua', 'Zubat', 'Zweilous', 'Zygarde'];

var selection_number = Math.floor(Math.random()*pokemonlist.length);

var selection = pokemonlist[selection_number];

var wordlength = selection.length;

var gamespace = Array(6);

for(var i=0; i<gamespace.length; i++) {
  var row = {};
  row.id = "r"+i;
  row.state = "unused";
  row.length = wordlength;
  row.boxes = Array(wordlength);
  for(var k=0; k<row.boxes.length; k++) {
    var box = {};
    box.id = row.id+"b"+k;
    box.delay = k*100+"ms"
    box.state = "neutral";
    box.letter = "";
    row.boxes[k] = box;
  };
  gamespace[i] = row;
  gamespace[0].state = "hot"
};



function App() {
  return (
    <div>
      <header className="MenuBar">
        <div className="LeftMenu">
          <button type="button" className="NavSandwich">
            <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.172974" width="20" height="3" rx="1.5" fill="#000000"></rect>
              <rect x="0.172974" y="7" width="20" height="3" rx="1.5" fill="#000000"></rect>
              <rect x="0.172974" y="14" width="20" height="3" rx="1.5" fill="#000000"></rect>
            </svg>
          </button>
          <button type="button" id="help-button" className="HelpButton">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="game-icon" data-testid="icon-help">
              <path fill="#000000" d=
              "M11 18h2v-2h-2v2z
              m1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z
              m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z
              m0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z">
              </path>
            </svg>
          </button>
        </div>
        <div className="GameTitle">
          <img height="35" width="auto" src={require("./assets/LogoLight.png")} />
        </div>
        <div className="RightMenu">
          <button>
            OPTIONS
          </button>
        </div>
      </header>
      <GameSpace rows={gamespace} />
      <div className="Keyboard">
      </div>
    </div>
  );
}

export default App;
