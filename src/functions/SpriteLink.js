/*
 * SpriteLink.js
*/ 

function spriteLink(pokeString)
{
    const hyphenator = {
        "jangmoo"  : "jangmo-o",
        "hakamoo"  : "hakamo-o",
        "kommoo"   : "kommo-o",
        "tapukoko" : "tapu-koko",
        "tapulele" : "tapu-lele",
        "tapubulu" : "tapu-bulu",
        "tapufini" : "tapu-fini",
        "typenull" : "type-null",
        "nidoran"  : "nidoran-m",
        "mrmime"   : "mr-mime",
        "mimejr"   : "mime-jr",
        "porygonz" : "porygon-z",
        "porygontwo" : "porygon2",
        "hooh"     : "ho-oh",
        "mrrime"   : "mr-rime",
        "enamorus" : "enamorus-incarnate"
    }

    const pokeLink = "https://img.pokemondb.net/";
    let pokePath = "";

    if (hyphenator[pokeString])
        pokeString = hyphenator[pokeString];

    var pkmnHomeOnly = new Set(["wyrdeer", "kleavor", "ursaluna",
                                "sneasler", "overqwil", "enamorus-incarnate"]);
    pokePath = pkmnHomeOnly.has(pokeString) ? 
        'home/normal/1x/' : 'sword-shield/icon/';
    
    // UNOWN
    if (pokeString.length === 1) {
        pokePath = `sprites/heartgold-soulsilver/normal/unown-${pokeString}.png`;
        return `${pokeLink}${pokePath}`;
    }

    if (pokeString !== "") {
        pokePath = `sprites/${pokePath}${pokeString}.png`;
        return(pokeLink + pokePath);
    }
    return `${pokeLink}s.png`; 
}

export default spriteLink;
