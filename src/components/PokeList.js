const PokeList = ["edward","wyrdeer","kleavor","ursaluna","sneasler",
      "overqwil","enamorus",'absol', 'accelgor', 'aggron', 
      'aipom', 'alakazam', 'alcremie', 'altaria', 'amaura', 
      'ambipom', 'ampharos', 'anorith', 'appletun', 'applin', 
      'arbok', 'arcanine', 'arceus', 'archen', 'archeops', 
      'ariados', 'armaldo', 'arrokuda', 'articuno', 'audino', 
      'aurorus', 'avalugg', 'azelf', 'azurill', 'bagon', 'baltoy',
      'banette', 'barboach', 'basculin', 'bayleef', 'beartic', 
      'beedrill', 'beheeyem', 'beldum', 'bergmite', 'bewear', 
      'bibarel', 'bidoof', 'binacle', 'bisharp', 'blaziken', 
      'blipbug', 'blissey', 'blitzle', 'boldore', 'boltund', 
      'bonsly', 'braixen', 'braviary', 'breloom', 'brionne', 
      'bronzong', 'bronzor', 'bruxish', 'budew', 'buizel', 
      'buneary', 'bunnelby', 'burmy', 'buzzwole', 'cacnea', 
      'cacturne', 'calyrex', 'camerupt', 'carbink', 'carkol', 
      'carvanha', 'cascoon', 'castform', 'caterpie', 'celebi', 
      'chansey', 'chatot', 'cherrim', 'cherubi', 'chespin', 
      'chewtle', 'chimchar', 'chimecho', 'chinchou', 'cinccino', 
      'clamperl', 'claydol', 'clefable', 'clefairy', 'cleffa', 
      'cloyster', 'cobalion', 'combee', 'comfey', 'corphish', 
      'corsola', 'cosmoem', 'cosmog', 'cottonee', 'cradily', 
      'cranidos', 'croagunk', 'crobat', 'croconaw', 'crustle', 
      'cubchoo', 'cubone', 'cufant', 'cursola', 'cutiefly', 
      'darkrai', 'dartrix', 'darumaka', 'dedenne', 'deerling', 
      'deino', 'delcatty', 'delibird', 'delphox', 'deoxys', 
      'dewgong', 'dewott', 'dewpider', 'dhelmise', 'dialga', 
      'diancie', 'diglett', 'ditto', 'dodrio', 'doduo', 'donphan', 
      'dottler', 'doublade', 'dragalge', 'drakloak', 'drampa', 
      'drapion', 'dratini', 'drednaw', 'dreepy', 'drifblim', 
      'drifloon', 'drilbur', 'drizzile', 'drowzee', 'dubwool', 
      'ducklett', 'dugtrio', 'duosion', 'durant', 'dusclops', 
      'dusknoir', 'duskull', 'dustox', 'dwebble', 'eevee', 
      'eiscue', 'ekans', 'eldegoss', 'elekid', 'elgyem', 'emboar', 
      'emolga', 'empoleon', 'entei', 'espeon', 'espurr', 'exploud',
      'falinks', 'fearow', 'feebas', 'fennekin', 'finneon', 
      'flaaffy', 'flabebe', 'flapple', 'flareon', 'floatzel', 
      'floette', 'florges', 'flygon', 'fomantis', 'foongus', 
      'fraxure', 'frillish', 'froakie', 'froslass', 'frosmoth', 
      'furfrou', 'furret', 'gabite', 'gallade', 'garbodor', 
      'garchomp', 'gastly', 'genesect', 'gengar', 'geodude', 
      'gible', 'gigalith', 'giratina', 'glaceon', 'glalie', 
      'glameow', 'gligar', 'gliscor', 'gloom', 'gogoat', 'golbat',
      'goldeen', 'golduck', 'golem', 'golett', 'golurk', 'goodra',
      'goomy', 'gorebyss', 'gothita', 'granbull', 'graveler', 
      'greedent', 'greninja', 'grimer', 'grookey', 'grotle', 
      'groudon', 'grovyle', 'grubbin', 'grumpig', 'gulpin', 
      'gumshoos', 'gurdurr', 'guzzlord', 'gyarados', 'hakamoo', 
      'happiny', 'hariyama', 'hatenna', 'hattrem', 'haunter', 
      'hawlucha', 'haxorus', 'heatmor', 'heatran', 'herdier', 
      'honedge', 'hoopa', 'hoothoot', 'hoppip', 'horsea', 
      'houndoom', 'houndour', 'huntail', 'hypno', 'illumise', 
      'impidimp', 'indeedee', 'inkay', 'inteleon', 'ivysaur', 
      'jangmoo', 'jirachi', 'jolteon', 'joltik', 'jumpluff', 
      'kabuto', 'kabutops', 'kadabra', 'kakuna', 'kartana', 
      'kecleon', 'keldeo', 'kingdra', 'kingler', 'kirlia', 
      'klang', 'klefki', 'klink', 'koffing', 'komala', 'kommoo', 
      'krabby', 'krokorok', 'kubfu', 'kyogre', 'kyurem', 'lairon',
      'lampent', 'landorus', 'lanturn', 'lapras', 'larvesta', 
      'larvitar', 'latias', 'latios', 'leafeon', 'leavanny', 
      'ledian', 'ledyba', 'liepard', 'lileep', 'lillipup', 
      'linoone', 'litleo', 'litten', 'litwick', 'lombre', 
      'lopunny', 'lotad', 'loudred', 'lucario', 'ludicolo', 
      'lugia', 'lumineon', 'lunala', 'lunatone', 'lurantis', 
      'luvdisc', 'luxio', 'luxray', 'lycanroc', 'machamp', 
      'machoke', 'machop', 'magby', 'magcargo', 'magearna', 
      'magikarp', 'magmar', 'magneton', 'makuhita', 'malamar', 
      'manaphy', 'mankey', 'mantine', 'mantyke', 'maractus', 
      'mareanie', 'mareep', 'marill', 'marowak', 'mawile', 
      'medicham', 'meditite', 'meganium', 'melmetal', 'meloetta', 
      'meltan', 'meowstic', 'meowth', 'mesprit', 'metang', 
      'metapod', 'mewtwo', 'mienfoo', 'mienshao', 'milcery', 
      'milotic', 'miltank', 'mimejr', 'mimikyu', 'minccino', 
      'minior', 'minun', 'moltres', 'monferno', 'morelull', 
      'morgrem', 'morpeko', 'mothim', 'mrmime', 'mrrime', 
      'mudbray', 'mudkip', 'mudsdale', 'munchlax', 'munna', 
      'murkrow', 'musharna', 'necrozma', 'nickit', 'nidoking', 
      'nidoran', 'nidoran', 'nidorina', 'nidorino', 'nihilego', 
      'nincada', 'ninjask', 'noctowl', 'noibat', 'noivern', 
      'nosepass', 'numel', 'nuzleaf', 'oddish', 'omanyte', 
      'omastar', 'oranguru', 'orbeetle', 'oricorio', 'oshawott', 
      'palkia', 'pancham', 'pangoro', 'panpour', 'pansage', 
      'pansear', 'paras', 'parasect', 'patrat', 'pawniard', 
      'pelipper', 'persian', 'petilil', 'phanpy', 'phantump', 
      'phione', 'pichu', 'pidgeot', 'pidgey', 'pidove', 'pignite',
      'pikachu', 'pikipek', 'pineco', 'pinsir', 'piplup', 'plusle',
      'poipole', 'politoed', 'poliwag', 'ponyta', 'popplio', 
      'porygon', 'porygonz', 'primeape', 'prinplup', 'psyduck', 
      'pupitar', 'purrloin', 'purugly', 'pyroar', 'quagsire', 
      'quilava', 'qwilfish', 'raboot', 'raichu', 'raikou', 'ralts',
      'rapidash', 'raticate', 'rattata', 'rayquaza', 'regice', 
      'regirock', 'remoraid', 'reshiram', 'rhydon', 'rhyhorn', 
      'ribombee', 'riolu', 'rockruff', 'rolycoly', 'rookidee', 
      'roselia', 'roserade', 'rotom', 'rowlet', 'rufflet', 
      'sableye', 'salandit', 'salazzle', 'samurott', 'sandile', 
      'sawsbuck', 'sceptile', 'scizor', 'scrafty', 'scraggy', 
      'scyther', 'seadra', 'seaking', 'sealeo', 'seedot', 
      'sentret', 'servine', 'seviper', 'sewaddle', 'sharpedo', 
      'shaymin', 'shedinja', 'shelgon', 'shellder', 'shellos', 
      'shelmet', 'shieldon', 'shiftry', 'shinx', 'shuckle', 
      'shuppet', 'sigilyph', 'silcoon', 'silvally', 'simipour', 
      'simisage', 'simisear', 'sinistea', 'skarmory', 'skiddo', 
      'skiploom', 'skitty', 'skorupi', 'skrelp', 'skuntank', 
      'skwovet', 'slaking', 'slakoth', 'sliggoo', 'slowbro', 
      'slowking', 'slowpoke', 'slugma', 'slurpuff', 'smeargle', 
      'smoochum', 'sneasel', 'snivy', 'snorlax', 'snorunt', 
      'snover', 'snubbull', 'sobble', 'solgaleo', 'solosis', 
      'solrock', 'spearow', 'spewpa', 'spheal', 'spinarak', 
      'spinda', 'spoink', 'spritzee', 'squirtle', 'stantler', 
      'staravia', 'starly', 'starmie', 'staryu', 'steelix', 
      'steenee', 'stufful', 'stunfisk', 'stunky', 'suicune', 
      'sunflora', 'sunkern', 'surskit', 'swablu', 'swadloon', 
      'swalot', 'swampert', 'swanna', 'swellow', 'swinub', 
      'swirlix', 'swoobat', 'sylveon', 'taillow', 'tangela', 
      'tapubulu', 'tapufini', 'tapukoko', 'tapulele', 'tauros', 
      'tepig', 'thievul', 'throh', 'thwackey', 'timburr', 
      'tirtouga', 'togekiss', 'togepi', 'togetic', 'torchic', 
      'torkoal', 'tornadus', 'torracat', 'torterra', 'totodile', 
      'toxapex', 'toxel', 'trapinch', 'treecko', 'tropius', 
      'trubbish', 'trumbeak', 'tsareena', 'turtwig', 'tympole', 
      'tynamo', 'typenull', 'tyrogue', 'tyrunt', 'umbreon', 
      'unfezant', 'unown', 'ursaring', 'urshifu', 'vaporeon', 
      'venipede', 'venomoth', 'venonat', 'venusaur', 'vibrava', 
      'victini', 'vigoroth', 'vikavolt', 'virizion', 'vivillon', 
      'volbeat', 'voltorb', 'vullaby', 'vulpix', 'wailmer', 
      'wailord', 'walrein', 'watchog', 'weavile', 'weedle', 
      'weezing', 'whiscash', 'whismur', 'wimpod', 'wingull', 
      'woobat', 'wooloo', 'wooper', 'wormadam', 'wurmple', 
      'wynaut', 'xerneas', 'yamask', 'yamper', 'yanma', 'yanmega',
      'yungoos', 'yveltal', 'zacian', 'zangoose', 'zapdos', 
      'zarude', 'zekrom', 'zeraora', 'zoroark', 'zorua', 'zubat', 
      'zweilous', 'zygarde'];

export default PokeList;