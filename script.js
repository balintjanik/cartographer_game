const table = document.querySelector("#gameTable") // table of the game
const nextItemTable = document.querySelector("#nextItemTable") // small 3x3 table that shows the next item
const nextItemTimeP = document.querySelector("#nextItemTimeP")
const springScoreSp = document.querySelector("#spring") // label of spring score
const summerScoreSp = document.querySelector("#summer") // label of summer score
const autumnScoreSp = document.querySelector("#autumn") // label of autumn score 
const winterScoreSp = document.querySelector("#winter") // label of winter score
const overallScoreSp = document.querySelector("#overall") // label of overall score
const rotateBtn = document.querySelector("#rotateBtn") // button for rotating the next item
const mirrorBtn = document.querySelector("#mirrorBtn") // button for mirroring the next item
const curSeasonSp = document.querySelector("#curSeason") // label for current season
const timeLeftSp = document.querySelector("#timeLeft") // label for time left of season
const gameoverDiv = document.querySelector("#gameover") // div for the Game Over text

const ATitle = document.querySelector("#ATitle")
const ADesc = document.querySelector("#ADesc")
const AScore = document.querySelector("#AScore")
const BTitle = document.querySelector("#BTitle")
const BDesc = document.querySelector("#BDesc")
const BScore = document.querySelector("#BScore")
const CTitle = document.querySelector("#CTitle")
const CDesc = document.querySelector("#CDesc")
const CScore = document.querySelector("#CScore")
const DTitle = document.querySelector("#DTitle")
const DDesc = document.querySelector("#DDesc")
const DScore = document.querySelector("#DScore")

const n = 11 // size of table

let items = [] // array of items after shuffle
let nextItem // the next item picked from the shuffled "items" array
let nextItemValid = false // validity of next item
let nextItemCoords = [] // if the next items position is valid, we store the coordinates to avoid the need of calculating them again

let time = 0;
let season = 0;

let AMission, BMission, CMission, DMission
let Avalue = 0;
let Bvalue = 0;
let Cvalue = 0;
let Dvalue = 0;
let springS = 0;
let summerS = 0;
let autumnS = 0;
let winterS = 0;
let mountainScore = 0;

let gameOver = false;

// matrix containing the fields of the game table
let fields = [
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', 'm', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', 'm', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', 'm', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', 'm', '0'],
    ['0', '0', '0', '0', '0', 'm', '0', '0', '0', '0', '0'],
    ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ]; 

  // constant array containing the items before shuffle, in their original order
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

// array containing all the missions
let missions = 
[
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      func : function(){ return b_mission1();}
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      func : function(){ return b_mission2();}
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      func : function(){ return b_mission3();}
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      func : function(){ return b_mission4();}
    },
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
      func : function() { return e_mission1();}
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
      func : function() { return e_mission2();}
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
      func : function() { return e_mission3();}
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
      func : function() { return e_mission4();}
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
      func : function() { return e_mission5();}
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
      func : function() { return e_mission6();}
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
      func : function() { return e_mission7();}
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
      func : function() { return e_mission8();}
    }
]

// constant array containing all the missions (for saving the original data from accidental changes)
const missionsOriginal = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ],
  "extra": [
    {
      "title": "Fasor",
      "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
    },
    {
      "title": "Gazdag város",
      "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
    },
    {
      "title": "Öntözőcsatorna",
      "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
    },
    {
      "title": "Mágusok völgye",
      "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
    },
    {
      "title": "Üres telek",
      "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
    },
    {
      "title": "Sorház",
      "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
    },
    {
      "title": "Páratlan silók",
      "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
    },
    {
      "title": "Gazdag vidék",
      "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
    }
  ],
}

// event listeners
rotateBtn.addEventListener("click", RotateNextItem)
mirrorBtn.addEventListener("click", MirrorNextItem)
table.addEventListener("mouseover", MouseOver)
table.addEventListener("mouseout", MouseOut)
table.addEventListener("click", MouseClick)

// setup the game
Setup()


function Setup(){ // setup of game
    // init table
    for (let i = 0; i < n; i++){
        const row = table.insertRow()
        for (let j = 0; j < n; j++){
            row.insertCell()
        }
    }
    
    // color fields
    UpdateFields()

    // shuffle elements with the Fisher-Yates algorithm
    items = shuffleArray(elements)

    // get the next item from the shuffled "fields" array
    GetNextItem()

    // get missions
    InitMissions()

    // set A and B missions as active
    SetMissionActive(ATitle.parentElement);
    SetMissionActive(BTitle.parentElement);
}

// if we click on the table and everything is correct (that were calculated during hover) then we place the item
function MouseClick(e){
    if (!nextItemValid) return;
    if (gameOver) return;
    PlaceItem(e)
}

// place item
function PlaceItem(e){
    for (let i = 0; i < nextItemCoords.length; i++){
        let type = GetShortType(nextItem)
        fields[nextItemCoords[i][0]][nextItemCoords[i][1]] = type
    }
    UpdateTime()
    UpdateFields();

    if (!gameOver) GetNextItem();
    MouseOver(e);
}

function UpdateTime(){
    // update time and season
    time += nextItem.time;

    if (time >= 7 && time < 14 && season == 0){ // end of spring

        // shuffle elements with the Fisher-Yates algorithm
        items = shuffleArray(elements)
        GetNextItem()

        // A mission
        let As = AMission.func()
        AScore.innerHTML = "Spring: " +  As + " - Winter: 0 - Overall: " + As
        springS += As;
        Avalue = As

        // B mission
        let Bs = BMission.func()
        BScore.innerHTML = "Spring: " +  Bs + " - Summer: 0 - Overall: " + Bs
        springS += Bs
        Bvalue = Bs

        // Surrounded mountains
        let Ms = surroundedMountains();
        springS += Ms - mountainScore;
        mountainScore = Ms

        // update
        springScoreSp.innerHTML = springS + " score"
        season = 1;

        // set active and inactive missions
        SetMissionActive(CTitle.parentElement);
        SetMissionInactive(ATitle.parentElement);
    }
    else if (time >= 14 && time < 21  && season == 1){ // end of summer

        // shuffle elements with the Fisher-Yates algorithm
        items = shuffleArray(elements)
        GetNextItem()

        // B mission
        let Bs = BMission.func()
        //BScore.innerHTML = "Spring: " + Bvalue + " - Summer: " + (Bs-Bvalue) + " - Overall: " + Bs
        BScore.innerHTML = "Spring: " + Bvalue + " - Summer: " + Bs + " - Overall: " + (Bs+Bvalue)
        //summerS += Bs-Bvalue;
        summerS += Bs
        Bvalue = Bs

        // C mission
        let Cs = CMission.func()
        CScore.innerHTML = "Summer: " + Cs + " - Autumn: 0 - Overall: " + Cs
        summerS += Cs
        Cvalue = Cs

        // Surrounded mountains
        let Ms = surroundedMountains();
        summerS += Ms - mountainScore;
        mountainScore = Ms

        // update
        summerScoreSp.innerHTML = summerS + " score"
        season = 2;

        // set active and inactive missions
        SetMissionActive(DTitle.parentElement);
        SetMissionInactive(BTitle.parentElement);
    }
    else if (time >= 21 && season == 2){ // end of autumn

        // shuffle elements with the Fisher-Yates algorithm
        items = shuffleArray(elements)
        GetNextItem()

        // C mission
        let Cs = CMission.func()
        //CScore.innerHTML = "Summer: " + Cvalue + " - Autumn: " + (Cs-Cvalue) + " - Overall: " + Cs
        CScore.innerHTML = "Summer: " + Cvalue + " - Autumn: " + Cs + " - Overall: " + (Cvalue + Cs)
        //autumnS += Cs-Cvalue
        autumnS += Cs
        Cvalue = Cs

        // D mission
        let Ds = DMission.func()
        DScore.innerHTML = "Autumn: " + Ds + " - Winter: 0 - Overall: 0"
        autumnS += Ds
        Dvalue = Ds

        // Surrounded mountains
        let Ms = surroundedMountains();
        autumnS += Ms - mountainScore;
        mountainScore = Ms

        // update
        autumnScoreSp.innerHTML = autumnS + " score"
        season = 3;

        // set active and inactive missions
        SetMissionActive(ATitle.parentElement);
        SetMissionInactive(CTitle.parentElement);
    }
    else if (time >= 28){ // end of winter (end game)
        // A mission
        let As = AMission.func()
        //AScore.innerHTML = "Spring: " + Avalue + " - Winter: " + (As-Avalue) + " - Overall: " + As 
        AScore.innerHTML = "Spring: " + Avalue + " - Winter: " + As + " - Overall: " + (As+Avalue) 
        //winterS += As-Avalue
        winterS += As
        Avalue = As

        // D mission
        let Ds = DMission.func()
        //DScore.innerHTML = "Autumn: " + Dvalue + " - Winter: " + (Ds-Dvalue) + " - Overall: " + Ds
        DScore.innerHTML = "Autumn: " + Dvalue + " - Winter: " + Ds + " - Overall: " + (Ds+Dvalue)
        //winterS += Ds-Dvalue
        winterS += Ds
        Dvalue = Ds

        // Surrounded mountains
        let Ms = surroundedMountains();
        winterS += Ms - mountainScore;
        mountainScore = Ms

        // update
        winterScoreSp.innerHTML = winterS + " score"

        // set active and inactive missions
        SetMissionInactive(DTitle.parentElement);
        SetMissionInactive(ATitle.parentElement);

        time = 28
        GameOver();
    }

    // update overall score text
    overallScoreSp.innerHTML = (springS + summerS + autumnS + winterS) + " score"

    // change the label of season and time remaining of season
    switch(season){
        case 0:
            curSeasonSp.innerHTML = "Spring"
            break
        case 1:
            curSeasonSp.innerHTML = "Summer"
            break
        case 2:
            curSeasonSp.innerHTML = "Autumn"
            break
        case 3:
            curSeasonSp.innerHTML = "Winter"
            break
    }
    if (time != 28) timeLeftSp.innerHTML = 7-time%7 + "/7"
    else timeLeftSp.innerHTML = "0/7"
}

function GameOver(){
    // set gameOver to true and disable buttons to avoid the user taking action after the game ended
    gameOver = true;
    rotateBtn.disabled = true;
    mirrorBtn.disabled = true;

    // empty the next item table
    nextItemTable.children[0].innerHTML = "Game Ended"
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            nextItemTable.rows[i].cells[j].style.backgroundImage = "none"
            nextItemTable.rows[i].cells[j].style.backgroundColor = "rgb(255, 240, 240)";
        }
    }

    document.querySelector("#title").innerHTML = document.querySelector("#title").innerHTML + "<br>Game ended!"
}

function MouseOver(e){
    // clear previously colored borders
    ClearHover();

    if (gameOver) return;

    // determine the indexes of hovered td and call the function that calculates everything else
    if (e.target.matches("td")){
        xind = e.target.closest('tr').rowIndex
        yind = e.target.cellIndex
        nextItemCenter = [xind, yind]
        ShowItemOnTable(nextItemCenter);
    }
}

// calculate if the item is placable with the center at the cursor, and color field borders accordingly
function ShowItemOnTable(nextItemCenter){
    // get coords
    let coords = []
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (nextItem.shape[i][j] != 0){
                coords.push([nextItemCenter[0]+(i-1), nextItemCenter[1]+(j-1)])
            }
        }
    }

    // check validity at edges, and dont update colors if out of bounds
    let valid = true;
    for (let i = 0; i < coords.length; i++){
        if (coords[i][0] < 0 || coords[i][0] >= n || coords[i][1] < 0 || coords[i][1] >= n){
            valid = false;
        }
    }
    if (!valid) return;

    // check validity at fills, and set bool to false
    for (let i = 0; i < coords.length; i++){
        if (fields[coords[i][0]][coords[i][1]] != '0'){
            valid = false;
        }
    }

    // color borders according to boolean of validity
    let str = (valid ? "solid 3px green" : "solid 3px red")
    for (let i = 0; i < coords.length; i++){
        table.rows[coords[i][0]].cells[coords[i][1]].style.border = str
    }
    if (valid){
        nextItemValid = true;
        nextItemCoords = coords;
    }
}


// make sure no borders stay colors when cursor leaves the table
function MouseOut(){
    ClearHover();
}

function RotateNextItem(){ // rotating the next item
    // updating the rotation property
    nextItem.rotation = (nextItem.rotation+1)%4;

    // making the actual rotation
    let m = nextItem.shape;
    for (i = 0; i < 3; i++) {
        for (j = i; j < 3 - i - 1; j++) {
            let temp = m[i][j];
            m[i][j] = m[3 - 1 - j][i];
            m[3 - 1 - j][i] = m[3 - 1 - i][3 - 1 - j];
            m[3 - 1 - i][3 - 1 - j] = m[j][3 - 1 - i];
            m[j][3 - 1 - i] = temp;
        }
    }
    nextItem.shape = m;

    // update table
    str = GetImage(nextItem)
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (nextItem.shape[i][j] != 0){
                nextItemTable.rows[i].cells[j].style.backgroundImage = str;
                nextItemTable.rows[i].cells[j].style.backgroundSize = "contain"
            } else {
                nextItemTable.rows[i].cells[j].style.backgroundImage = "none"
                nextItemTable.rows[i].cells[j].style.backgroundColor = "rgb(255, 240, 240)";
            }
        }
    }
}

function MirrorNextItem(){
    // updating the mirror property
    if (nextItem.mirror){
        nextItem.mirror = false;
    } else {
        nextItem.mirror = true;
    }

    // making the actual mirroring
    for(let i=0;i<3;i++){
        nextItem.shape[i].reverse();
    }

    // update table
    str = GetImage(nextItem)
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (nextItem.shape[i][j] != 0){
                nextItemTable.rows[i].cells[j].style.backgroundImage = str;
                nextItemTable.rows[i].cells[j].style.backgroundSize = "contain"
            } else {
                nextItemTable.rows[i].cells[j].style.backgroundImage = "none"
                nextItemTable.rows[i].cells[j].style.backgroundColor = "rgb(255, 240, 240)";
            }
        }
    }
}

function SetMissionActive(mission){
    mission.style.backgroundColor = "rgb(255, 240, 240)";
    mission.style.color = "rgb(55, 55, 55)";
}

function SetMissionInactive(mission){
    mission.style.backgroundColor = "rgb(55, 55, 55)";
    mission.style.color = "rgb(255, 240, 240)";
}

// initialize the missions
function InitMissions(){
    AMission = missions.splice(Math.floor(Math.random()*missions.length), 1)[0];
    BMission = missions.splice(Math.floor(Math.random()*missions.length), 1)[0];
    CMission = missions.splice(Math.floor(Math.random()*missions.length), 1)[0];
    DMission = missions.splice(Math.floor(Math.random()*missions.length), 1)[0];

    ATitle.innerHTML = AMission.title;
    ADesc.innerHTML = AMission.description;
    BTitle.innerHTML = BMission.title;
    BDesc.innerHTML = BMission.description;
    CTitle.innerHTML = CMission.title;
    CDesc.innerHTML = CMission.description;
    DTitle.innerHTML = DMission.title;
    DDesc.innerHTML = DMission.description;
}

function shuffleArray(array){ // shuffle an array given in parameters and return with a new shuffled array
    let arr = array.slice();
    for (let i = arr.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function GetNextItem(){ // get the next item of the shuffled items list (and remove it as well)
    if (items.length == 0) return;
    nextItem = items.pop()
    nextItemTimeP.innerHTML = "Required time: " + nextItem.time;
    str = GetImage(nextItem)
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (nextItem.shape[i][j] != 0){
                nextItemTable.rows[i].cells[j].style.backgroundImage = str;
                nextItemTable.rows[i].cells[j].style.backgroundSize = "contain"
            } else {
                nextItemTable.rows[i].cells[j].style.backgroundImage = "none"
                nextItemTable.rows[i].cells[j].style.backgroundColor = "rgb(255, 240, 240)";
            }
        }
    }
}

function GetShortType(item){
    let type = ''
    switch (item.type){
        case 'water':
            type = 'W'
            break;
        case 'forest':
            type = 'w'
            break;
        case 'farm':
            type = 'f'
            break;
        case 'town':
            type = 'v'
            break;
    }
    return type;
}

function GetImage(item){
    let str = "";
    switch (item.type){
        case 'water':
            str = "url(\"./img/water.png\")"
            break;
        case 'forest':
            str = "url(\"./img/woods.png\")"
            break;
        case 'farm':
            str = "url(\"./img/farm.png\")"
            break;
        case 'town':
            str = "url(\"./img/village.png\")"
            break;
    }
    return str;
}

function ClearHover(){ // clear borders of fields changed by hover
    nextItemValid = false;
    for (let i = 0;i < n; i++){
        for (let j = 0; j < n; j++){
            table.rows[i].cells[j].style.border = "none";
        }
    }
}

function UpdateFields(){ // update the visuals of the fields of the game table
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            let str = ""
            switch(fields[i][j]){
                case 'm': // mountains
                    str = "url(\"./img/mountain.png\")"
                    break;
                case 'w': // woods
                    str = "url(\"./img/woods.png\")"
                    break;
                case 'v': // village
                    str = "url(\"./img/village.png\")"
                    break;
                case 'f': // farm
                    str = "url(\"./img/farm.png\")"
                    break;
                case 'W': // water
                    str = "url(\"./img/water.png\")"
                    break;
                default:
                    str = "rgb(240, 225, 180)";
                    break;
            }
            if (str[0] == 'u') {
                table.rows[i].cells[j].style.backgroundImage = str;
                table.rows[i].cells[j].style.backgroundSize = "contain"
            } else {
                table.rows[i].cells[j].style.backgroundColor = str;
            }
        }
    }
}

// Score for surrounded mountaings
function surroundedMountains(){
    let score = 0;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (fields[i][j] == 'm'){
                let surrounded = true;
                if (i > 0 && fields[i-1][j] == '0') surrounded = false;
                if (i < n-1 && fields[i+1][j] == '0') surrounded = false;
                if (j > 0 && fields[i][j-1] == '0') surrounded = false;
                if (j < n-1 && fields[i][j+1] == '0') surrounded = false;

                if (surrounded){
                    score++;
                }
            }
        }
    }
    return score;
}

// Basic-1: Edge of the woods
function b_mission1(){
    let score = 0;
    for (let j = 0; j < n; j++){
        if (fields[0][j] == 'w') score++;
        if (fields[n-1][j] == 'w') score++;
    }
    for (let i = 1; i < n-1;i++){
        if (fields[i][0] == 'w') score++;
        if (fields[i][n-1] == 'w') score++;
    }
    return score;
}

// Basic-2: Dreamy-valley
function b_mission2(){
    let score = 0;
    for (let i = 0; i < n; i++){
        let c = 0;
        for (let j = 0; j < n; j++){
            if (fields[i][j] == 'w') c++;
        }
        if (c >= 3) score += 4;
    }
    return score;
}

// Basic-3: Potato watering
function b_mission3(){
    let score = 0;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (fields[i][j] == 'W'){
                let neighbour = false;
                if (i > 0 && fields[i-1][j] == 'f') neighbour = true;
                if (i < n-1 && fields[i+1][j] == 'f') neighbour = true;
                if (j > 0 && fields[i][j-1] == 'f') neighbour = true;
                if (j < n-1 && fields[i][j+1] == 'f') neighbour = true;
                if (neighbour) score += 2;
            }
        }
    }
    return score;
}

// Basic-4: Border region
function b_mission4(){
    let score = 0;

    
    for(let i = 0; i < n; i++){
        // get row
        let j = 0;
        while(j < n && fields[i][j] != '0'){
            j++;
        }
        if (j >= n) score += 6;

        // get column
        j = 0;
        while (j < n && fields[j][i] != '0'){
            j++;
        }
        if (j >= n) score += 6;
    }

    return score;
}

// Extra-1: Tree-line
function e_mission1(){
    let longest = 0;
    for (let j = 0; j < n; j++){
        let curLong = 0;
        for (let i = 0; i < n ; i++){
            if (fields[i][j] == 'w'){
                curLong++;
                if (curLong > longest) longest = curLong;
            } else {
                curLong = 0;
            }
        }
    }

    return longest * 2;
}

// Extra-2: Rich City
function e_mission2(){
    let score = 0;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (fields[i][j] == 'v'){
                let neighbors = [];
                if (i > 0 && fields[i-1][j] != '0' && !neighbors.includes(fields[i-1][j]))  neighbors.push(fields[i-1][j])
                if (i < n-1 && fields[i+1][j] != '0' && !neighbors.includes(fields[i+1][j])) neighbors.push(fields[i+1][j])
                if (j > 0 && fields[i][j-1] != '0' && !neighbors.includes(fields[i][j-1]))  neighbors.push(fields[i][j-1])
                if (j < n-1 && fields[i][j+1] != '0' && !neighbors.includes(fields[i][j+1])) neighbors.push(fields[i][j+1])
                if (neighbors.length >= 3){ score += 3; }
            }
        }
    }
    return score;
}

// Extra-3: Watering channel
function e_mission3(){
    let score = 0;
    for (let j = 0; j < n; j++){
        let Ws = 0;
        let fs = 0;
        for (let i = 0; i < n; i++){
            if (fields[i][j] == 'W') Ws++;
            if (fields[i][j] == 'f') fs++;
        }
        if (Ws != 0 && Ws == fs) score += 4;
    }
    return score;
}

// Extra-4: Wizards' valley
function e_mission4(){
    let score = 0;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < n; j++){
            if (fields[i][j] == 'm'){
                if (i > 0 && fields[i-1][j] == 'W') score += 3;
                if (i < n-1 && fields[i+1][j] == 'W') score += 3;
                if (j > 0 && fields[i][j-1] == 'W') score += 3;
                if (j < n-1 && fields[i][j+1] == 'W') score += 3;
            }
        }
    }
    return score;
}

// Extra-5: Empty field
function e_mission5(){
    let score = 0;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if (fields[i][j] == '0'){
                let villageNeighbor = false;
                if (i > 0 && fields[i-1][j] == 'v') villageNeighbor = true;
                if (i < n-1 && fields[i+1][j] == 'v') villageNeighbor = true;
                if (j > 0 && fields[i][j-1] == 'v') villageNeighbor = true;
                if (j < n-1 && fields[i][j+1] == 'v') villageNeighbor = true;
                if (villageNeighbor) score += 2;
            }
        }
    }
    return score;
}

// Extra-6: House row
function e_mission6(){
    let longest = 0;
    for (let i = 0; i < n; i++){
        let curLong = 0;
        for (let j = 0; j < n ; j++){
            if (fields[i][j] == 'v'){
                curLong++;
                if (curLong > longest) longest = curLong;
            } else {
                curLong = 0;
            }
        }
    }

    return longest * 2;
}

// Extra-7: Odd silos
function e_mission7(){
    let score = 0;

    
    for(let j = 0; j < n; j+=2){

        // get column
        i = 0;
        while (i < n && fields[i][j] != '0'){
            i++;
        }
        if (i >= n) score += 10;
    }

    return score;
}

// Extra-8: Rich country
function e_mission8(){
    let score = 0;
    for (let i = 0; i < n; i++){
        let types = []
        for (let j = 0; j < n; j++){
            if (fields[i][j] != '0' && !types.includes(fields[i][j])) types.push(fields[i][j])
        }
        if (types.length >= 5) score += 4;
    }
    return score;
}