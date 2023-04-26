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

    var pokeLink = "https://img.pokemondb.net/";
    var pokePath = "";

    if (hyphenator[pokeString])
        pokeString = hyphenator[pokeString];

    var pkmnHomeOnly = new Set(["wyrdeer", "kleavor", "ursaluna",
                                "sneasler", "overqwil", "enamorus-incarnate"]);

    if (pkmnHomeOnly.has(pokeString))
        pokePath = "home/normal/1x/";
    else
        pokePath = "sword-shield/icon/";

    if (pokeString !== "") {
        pokePath = "sprites/" + pokePath + pokeString + ".png";
        return(pokeLink + pokePath);
    }
    return(pokeLink + "s.png"); 
}

export default spriteLink;
