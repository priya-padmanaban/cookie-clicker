/***********
  
cookie clicker by priya

INSTRUCTIONS:

Simply click the cookie and buy businesses to expand your baking empire!
(Use UP & DOWN arrow keys to scroll through businesses)


SAVING:

To save, simply click the 'save' button in the top left corner, and copy the information. Paste it somewhere safe. Next time you want to play, simply paste the information into saveData on line 17. Be sure to highlight everything from 'var' to 'for save data', and replace it all. Good luck!

**********/

var saveData = []; // for save data

var cookies = 0; // your cookies
var clickGain = 1;

var yOffset = 50; // for scrolling

var cookieGain = 0; // for display

var heavenlyChips = 0;

frameRate(60); // please don't change

var Business = function(name, price, priceIncrease, cookiesGain, y, number) {
    this.name = name;
    this.price = price;
    this.priceIncrease = priceIncrease;
    this.cookiesGain = cookiesGain;
    this.number = number; // just in case we have save data

    this.y = y; // y for display
};

Business.prototype.draw = function() {
    noStroke();
    fill(59, 59, 59);
    rect(200 * (width / 400), (this.y - yOffset) * (width / 400), 180 * (width / 400), 50 * (width / 400)); // draw button
    
    fill(255, 255, 255);
    textSize(13 * (width / 400));
    text("You have " + this.number + " " + this.name + "s\n" + this.name + "s cost:\n" + floor(this.price * 10) / 10, 205 * (width / 400), (this.y - yOffset + 15) * (width / 400)); // info
};

Business.prototype.bought = function() {
    if (cookies >= this.price) {
        cookies -= this.price - 1; // subtract price number of cookies
        this.price *= this.priceIncrease; // increase price
        this.number++; // add to number
        this.boughtTimer = 0; // to make sure you don't accidentally buy more than you want
        cookieGain += (this.cookiesGain) * (1 + (heavenlyChips * 0.01)); // factor in heavenly chips
    }
};

Business.prototype.addCookies = function() {
    cookies += ((this.cookiesGain * this.number) / 60) * (1 + (heavenlyChips * 0.01)); // add cookies smoothy (equal every frame). Factor heavenly chips in too.
};

// this is an array of businesses to be made
var businessesToMake = [
    {
        name: "pointer",
        price: 5, // 5
        priceIncrease: 1.1,
        cookiesGain: 0.1, // 0.1
        number: 0,
    },
    {
        name: "grandma",
        price: 500, // 500
        priceIncrease: 1.1,
        cookiesGain: 3, // 3
        number: 0,
    },
    {
        name: "farm",
        price: 10000, // 10 thousand
        priceIncrease: 1.15,
        cookiesGain: 25, // 25
        number: 0,
    },
    {
        name: "factorie",
        price: 100000, // 100 thousand
        priceIncrease: 1.15,
        cookiesGain: 250, // 250
        number: 0,
    },
    {
        name: "mine",
        price: 2500000, // 2.5 million
        priceIncrease: 1.15,
        cookiesGain: 2500, // 2.5 thousand
        number: 0,
    },
    {
        name: "shipment",
        price: 25000000, // 25 million
        priceIncrease: 1.2,
        cookiesGain: 50000, // 30 thousand thousand
        number: 0,
    },
    {
        name: "alchemy lab",
        price: 1000000000, // 1 billion
        priceIncrease: 1.2,
        cookiesGain: 5000000, // 5 million
        number: 0,
    },
    {
        name: "portal",
        price: 50000000000, // 50 billion
        priceIncrease: 1.2,
        cookiesGain: 50000000, // 50 million
        number: 0,
    },
    {
        name: "time machine",
        price: 10000000000000, // 10 trillion
        priceIncrease: 1.2,
        cookiesGain: 50000000000, // 50 billion
        number: 0,
    },
    {
        name: "large collider",
        price: 1000000000000000, // 1 quadrillion
        priceIncrease: 1.2,
        cookiesGain: 10000000000000, // 10 trillion
        number: 0,
    },
    {
        name: "prism",
        price: 100000000000000000000, // 100 quintillion
        priceIncrease: 1.2,
        cookiesGain: 10000000000000, // 1 quadrilln
        number: 0,
    },
    {
        name: "warp drive",
        price: 1000000000000000000000000000, // 10 octillion
        priceIncrease: 1.2,
        cookiesGain: 1000000000000000000000, // 1 sextillion
        number: 0,
    },
];

var businesses = []; // array of Business instances

var originalBusinessesData = businessesToMake; // for reseting at the end of saving

var prestigeConfirm = false;
var achievements = [
    [
        {
            name: "wake\n and\nbake",
            requirement: "Bake\n10\ncookies",
            completed: false,
        },
        {
            name: "humble\nbeginnings",
            requirement: "Bake\n500\ncookies",
            completed: false,
        },
        {
            name: "local\nmedia",
            requirement: "Bake\n100000\ncookies",
            completed: false,
        },
        {
            name: "inter-\nnational",
            requirement: "Bake\n1 billion\ncookies",
            completed: false,
        },
        {
            name: "cookie\ngod",
            requirement: "Bake 10\nquintillion\ncookies",
            completed: false,
        },
    ],
    [
        {
            name: "clicker",
            requirement: "Buy\n5\npointers",
            completed: false,
        },
        {
            name: "pointer\narmy",
            requirement: "Buy\n200\npointers",
            completed: false,
        },
        {
            name: "oh\nhoney..",
            requirement: "Buy\n10\ngrandmas",
            completed: false,
        },
        {
            name: "we\nreign\nsupreme",
            requirement: "Buy\n250\ngrandmas",
            completed: false,
        },
        {
            name: "all\nnatural",
            requirement: "Buy\n25\nfarms",
            completed: false,
        },
        {
            name: "chocolate\nfertilizer",
            requirement: "Buy\n250\nfarms",
            completed: false,
        },
    ],
    [
        {
            name: "industrial-\nizing",
            requirement: "Buy\n10\nfactories",
            completed: false,
        },
        {
            name: "industrial\nin and\nout",
            requirement: "Buy\n250\nfactories",
            completed: false,
        },
        {
            name: "chocalat-\nium?",
            requirement: "Buy\n25 mines",
            completed: false,
        },
        {
            name: "subsurface\nliquidized\nchocolate\nlakes!",
            requirement: "Buy 100\nmines.\n(too many\nwords)",
            completed: false,
        },
        {
            name: "moon and\nback",
            requirement: "Buy\n5\nshipments",
            completed: false,
        },
        {
            name: "wormholes\nbaby!",
            requirement: "Buy\n100\nshipments",
            completed: false,
        },
    ],
    [
        {
            name: "atomic\ncookies?",
            requirement: "Buy 5\nalchemy\nlabs",
            completed: false,
        },
        {
            name: "Molecular\nsyrup",
            requirement: "Buy\n100\nalchemy\nlabs",
            completed: false,
        },
        {
            name: "where\nto?",
            requirement: "Buy\n5\nportals",
            completed: false,
        },
        {
            name: "inter\ndimensional\ncookie\neducation.",
            requirement: "Buy\n100\nportals",
            completed: false,
        },
        {
            name: "time\nbender",
            requirement: "Buy\n10\ntime machines",
            completed: false,
        },
        {
            name: "universal\ndomination",
            requirement: "Buy\n100\ntime machines",
            completed: false,
        },
    ],
    [
        {
            name: "cookies in\nquarks??",
            requirement: "Buy\n1\nlarge\ncollider",
            completed: false,
        },
        {
            name: "redshifted\ncookies?",
            requirement: "Buy\n250\nlarge\ncolliders",
            completed: false,
        },
        {
            name: "light-\nspeed!",
            requirement: "Buy\n1\nprism",
            completed: false,
        },
        {
            name: "tooooo\nfast..",
            requirement: "Buy\n50\nprisms",
            completed: false,
        },
        {
            name: "space\ntime\nwarp!!",
            requirement: "Buy\n1\nwarp\ndrive",
            completed: false,
        },
        {
            name: "accompl-\nishments.\n(AND BEAT\nING LIFE)",
            requirement: "Buy\n50\nwarp\ndrives",
            completed: false,
        },
    ],
];

var convertData = function() {
    // this function converts data from the businesses array into instances of the Business object
    
    // IF we have saved data, extract and apply
    
    if (prestigeConfirm) {
        saveData = [];
    }
    
    for (var i = 0; i < businessesToMake.length; i++) {
        if (prestigeConfirm) {
            // just in case it isn't set already, set number to 0
            businessesToMake[i].number = 0;
            businessesToMake[i].price = originalBusinessesData[i].price;
        }
    }
    
    // reset businnesses
    businesses = [];
    
    if (saveData.length < 1) {
        for (var i = 0; i < businessesToMake.length; i++) {
            businesses.push(new Business(businessesToMake[i].name, businessesToMake[i].price, businessesToMake[i].priceIncrease, businessesToMake[i].cookiesGain, (i * 60) + 70, businessesToMake[i].number));
        }
    }
    else {
        // save by making businesses with new data
        cookies = saveData[0];
        cookieGain = saveData[1];
        heavenlyChips = saveData[3];
        // save businesses
        for (var i = 0; i < businessesToMake.length; i++) {
            businesses.push(new Business(businessesToMake[i].name, saveData[2][i].price, businessesToMake[i].priceIncrease, businessesToMake[i].cookiesGain, (i * 60) + 70, saveData[2][i].number));
        }
        // save achievements
        for (var i = 0; i < achievements.length; i++) {
            for (var j = 0; j < achievements[i].length; j++) {
                achievements[i][j].completed = saveData[4][i][j];
            }
        }
        saveData = [];
    }
};

var buyBusinesses = function() {
    for (var i = 0; i < businesses.length; i++) {
        if (mouseX > 200 * (width / 400) && mouseX < 380 * (width / 400) && mouseY > (businesses[i].y - yOffset) * (width / 400) && mouseY < (businesses[i].y - yOffset + 50) * (width / 400)) {
            // mouse is in the button
            businesses[i].bought();
        }
    }
};

var cookieAnimation = false;
var cookieTimer = 0;

var drawCookie = function() {
    // animate the cookie
    if (cookieAnimation) {
        cookieAnimation = false;
        cookieTimer += 2;
    }
    if (cookieTimer !== 0) {
        cookieTimer += 3;
        if (cookieTimer >= 30) {
            cookieTimer = 0;
        }
    }
    noStroke();
    fill(148, 127, 62);
    // cookie
    ellipse(100 * (width / 400), 120 * (width / 400), (70 + (30 - cookieTimer)) * (width / 400), (70 + (30 - cookieTimer)) * (width / 400));
    fill(59, 49, 0);
    // chocolate chips
    ellipse(104 * (width / 400), (142 + (30 - cookieTimer) / 2) * (width / 400), 19 * (width / 400), 15 * (width / 400));
    ellipse((95 - (30 - cookieTimer) / 2) * (width / 400), 107 * (width / 400), 12 * (width / 400), 12 * (width / 400));
    ellipse((112 + (30 - cookieTimer) / 2) * (width / 400), (109 - (30 - cookieTimer) / 2) * (width / 400), 15 * (width / 400), 14 * (width / 400));
    ellipse((110 + (30 - cookieTimer) / 2) * (width / 400), 125 * (width / 400), 16 * (width / 400), 13 * (width / 400));
    ellipse((86 - (30 - cookieTimer) / 2) * (width / 400), (123 + (30 - cookieTimer) / 2) * (width / 400), 14 * (width / 400), 14 * (width / 400));
};

var particles = []; // array of particles

var Particle = function(x, y) {
    this.x = x;
    this.y = -10;
    this.life = random(100, 200);
    this.fallSpeed = random(2, 5);
    this.rotationSpeed = random(-5, 5);
    this.rotation = 0;
};

Particle.prototype.update = function() {
    this.life--; // subtract life to decrease size and increase opacity and eventually take it off the particle array
    this.rotation += this.rotationSpeed; // rotate for cool effects
};

Particle.prototype.draw = function() {
    pushMatrix();
        translate(this.x * (width / 400), this.y * (width / 400));
        rotate(this.rotation);
        noStroke();
        // cookie
        fill(176, 158, 86, this.life * 2);
        ellipse(0, 0, (this.life / 5) * (width / 400), (this.life / 5) * (width / 400));
        // chocolate chips
        fill(46, 36, 0, this.life * 2);
        ellipse((0 - this.life / 40) * (width / 400), (0 - this.life / 25) * (width / 400), (this.life / 23) * (width / 400), (this.life / 17) * (width / 400));
        ellipse((this.life / 30) * (width / 400), (0 - this.life / 143) * (width / 400), (this.life / 25) * (width / 400), (this.life / 28) * (width / 400));
        ellipse((0 - this.life / 20) * (width / 400), (this.life / 22) * (width / 400), (this.life / 16) * (width / 400), (this.life / 23) * (width / 400));
        ellipse((this.life / 24) * (width / 400), (this.life / 18) * (width / 400), (this.life / 21) * (width / 400), (this.life / 21) * (width / 400));
    popMatrix();
};

Particle.prototype.updatePhysics = function() {
    this.y += this.fallSpeed;
};

convertData();
var notEnoughTimer = 0;

var calcHeavenlyChips = function() {
    var chips = 0;
    var curCost = 100000000000; // 10^11
    var costInc = 1;
    while (curCost < cookies) {
        curCost += 100000000000 * costInc;
        costInc++;
        chips++;
    }
    return chips;
};

var viewAchievements = false;

mouseReleased = function() {
    if (dist(mouseX, mouseY, 100 * (width / 400), 120 * (width / 400)) < 50 * (width / 400)) {
        cookies += clickGain;
        cookieAnimation = true;
        // add a cookie particle
        particles.push(new Particle(random(400), -30));
    }
    
    buyBusinesses(); // buy if mouse is over a buy button
    
    if (mouseX > 10 * (width / 400) && mouseX < (10 + 31) * (width / 400) && mouseY > 10 * (width / 400) && mouseY < (10 + 14) * (width / 400)) {
        // mouse is over the save button, so we must print out save data
        println("var saveData = [" + cookies + ", " + cookieGain + ", [");
        for (var i = 0; i < businesses.length; i++) {
            println("{price: " + businesses[i].price + ", number: " + businesses[i].number + "},"); // save price and numbers of each business, and cookies and cookieGains
        }
        println("]," + heavenlyChips + ", [");
        for (var i = 0; i < achievements.length; i++) {
            println("[");
            for (var j = 0; j < achievements[i].length; j++) {
            println(achievements[i][j].completed + ",");
            }
            println("],");
        }
        println("],]; // for save data");
    }
    
    if (mouseX > 10 * (width / 400) && mouseX < (10 + 63) * (width / 400) && mouseY > 369 * (width / 400) && mouseY < (369 + 22) * (width / 400)) {
        // prestige IF we have enough cookies
        if (cookies > (1000000000000)) {
            prestigeConfirm = true;
        }
        else {
            notEnoughTimer++;
        }
    }
    
    if (prestigeConfirm) {
        if (mouseX > 130 * (width / 400) && mouseX < (130 + 140)  * (width / 400) && mouseY > 120  * (width / 400) && mouseY < (120 + 40)  * (width / 400)) {
            // declined
            prestigeConfirm = false;
        }
        if (mouseX > 130 * (width / 400) && mouseX < (130 + 140)  * (width / 400) && mouseY > 170  * (width / 400) && mouseY < (170 + 40)  * (width / 400)) {
            // confirmed
            // first, add heavenly chips
            heavenlyChips += calcHeavenlyChips();
            
            // reset everything
            convertData();
            cookies = 0;
            cookieGain = 0;
            
            prestigeConfirm = false;
            // prestige done!
        }
    }
    if (mouseX > 50 * (width / 400) && mouseX < (50 + 95) * (width / 400) && mouseY > 10 * (width / 400) && mouseY < (10 + 18) * (width / 400)) {
        // achievements button clicked
        viewAchievements = true;
    }
    if (viewAchievements) {
        if (mouseX > (325 * (width / 400)) && mouseX < (325 * (width / 400)) + (60 * (width / 400)) && mouseY > 10 * (width / 400) && mouseY < (10 * (width / 400)) + (27 * (width / 400))) {
            viewAchievements = false; // exit viewing
        }
    }
};

var displayData = function() {
    fill(0, 0, 0);
    textSize(13 * (width / 400));
    text("You have:\n" + floor(cookies * 10) / 10 + " cookies.\nYou get:\n" + clickGain + " cookies per click.\nYou gain:\n" + floor(cookieGain * 10) / 10 + " cookies per second.\n\nYou have:\n" + heavenlyChips + " heavenly chips.", 7 * (width / 400), 203 * (width / 400));
};

var updateClickCookies = function() {
    if (cookies < 100) {
        clickGain = 1;
    }
    else if (cookies < 1000) {
        clickGain = 5;
    }
    else if (cookies < 25000) {
        clickGain = 25;
    }
    else if (cookies < 500000) {
        clickGain = 250;
    }
    else if (cookies < 1000000) {
        clickGain = 2500;
    }
    else if (cookies < 10000000) {
        clickGain = 10000;
    }
    else if (cookies < 100000000) {
        clickGain = 25000;
    }
    else if (cookies < 100000000000) {
        clickGain = 10000000;
    }
    else if (cookies < 10000000000000) {
        clickGain = 1000000000;
    }
    else if (cookies < 1000000000000000) {
        clickGain = 250000000000;
    }
    else if (cookies < 100000000000000000) {
        clickGain = 1000000000000;
    }
    else if (cookies < 1000000000000000000) {
        clickGain = 25000000000000;
    }
};

var pressedKeys = []; // for key pressing

// key pressing

keyPressed = function() {
	// If key isn't already pressed
	if (pressedKeys.indexOf(keyCode) === -1) {
		pressedKeys.push(keyCode);
	}
};

keyReleased = function() {
	// If the key released has previously been pressed
	if(pressedKeys.indexOf(keyCode) !== -1) {
		// Remove the key from array of pressed keyss
	    pressedKeys.splice(pressedKeys.indexOf(keyCode), 1);
	}	
};

var saveButton = function() {
    // shade button differently if mouse is over it
    fill(184, 184, 184);
    if (mouseX > 10 * (width / 400) && mouseX < (10 + 31) * (width / 400) && mouseY > 10 * (width / 400) && mouseY < (10 + 14) * (width / 400)) {
        fill(17, 166, 0);
    }
    
    rect(10 * (width / 400), 10 * (width / 400), 31 * (width / 400), 14 * (width / 400));
    fill(0, 0, 0);
    textSize(10 * (width / 400));
    text("SAVE", 12 * (width / 400), 21 * (width / 400));
};

var prestigeButton = function() {
    // show if there aren't enough cookies to prestige
    if (notEnoughTimer !== 0) {
        notEnoughTimer++; // increment
        if (notEnoughTimer >= 120) {
            notEnoughTimer = 0;
        }
        textSize(11 * (width / 400));
        fill(255, 0, 0);
        text("You don't have enough cookies to\nprestige. You need " + ((10000000000000) - cookies) + "\nmore cookies to prestige.", 7 * (width / 400), 339 * (width / 400));
    }
    // shade button differently if mouse is over it
    fill(184, 184, 184);
    if (mouseX > 10 * (width / 400) && mouseX < (10 + 63) * (width / 400) && mouseY > 369 * (width / 400) && mouseY < (369 + 22) * (width / 400)) {
        fill(242, 189, 255);
    }
    
    rect(10 * (width / 400), 369 * (width / 400), 63 * (width / 400), 22 * (width / 400));
    fill(0, 0, 0);
    textSize(16 * (width / 400));
    text("Prestige", 12 * (width / 400), 385 * (width / 400));
    
    if (prestigeConfirm) {
        fill(180, 180, 180, 235);
        // background
        rect(100 * (width / 400), 100 * (width / 400), 200 * (width / 400), 175 * (width / 400));
        // confirmation buttons
        fill(255, 0, 0);
        if (mouseX > 130 * (width / 400) && mouseX < (130 + 140)  * (width / 400) && mouseY > 120  * (width / 400) && mouseY < (120 + 40)  * (width / 400)) {
            // shade 'decline' more darkly
            fill(200, 0, 0);
        }
        rect(130 * (width / 400), 120 * (width / 400), 140 * (width / 400), 40 * (width / 400));
        fill(0, 255, 0);
        if (mouseX > 130 * (width / 400) && mouseX < (130 + 140)  * (width / 400) && mouseY > 170  * (width / 400) && mouseY < (170 + 40)  * (width / 400)) {
            // shade 'confirm' more darkly
            fill(0, 200, 0);
        }
        rect(130 * (width / 400), 170 * (width / 400), 140 * (width / 400), 40 * (width / 400));
        
        fill(0, 0, 0);
        textSize(27 * (width / 400));
        text("DECLINE", 140 * (width / 400), 150 * (width / 400));
        text("CONFIRM", 137 * (width / 400), 200 * (width / 400));
        textSize(16 * (width / 400));
        text("You would recieve\n" + calcHeavenlyChips() + "\nheavenly chips.", 133 * (width / 400), 230 * (width / 400));
        textSize(11 * (width / 400));
        text("(This will wipe all cookies and buildings!)", 101 * (width / 400), 115 * (width / 400));
    }
};

var achievementsButton = function() {
    // shade button differently if mouse is over it
    fill(184, 184, 184);
    if (mouseX > 50 * (width / 400) && mouseX < (50 + 95) * (width / 400) && mouseY > 10 * (width / 400) && mouseY < (10 + 18) * (width / 400)) {
        fill(255, 237, 214);
    }
    
    rect(50 * (width / 400), 10 * (width / 400), 95 * (width / 400), 18 * (width / 400));
    fill(0, 0, 0);
    textSize(14 * (width / 400));
    text("Achievements", 53 * (width / 400), 24 * (width / 400));
};

var drawAchievements = function() {
    // draw background
    fill(46, 46, 46, 230);
    rect(0, 0, width, height);
    for (var j = 0; j < achievements.length; j++) {
        for (var i = 0; i < achievements[j].length; i++) {
            // achievements
            fill(171, 171, 171);
            if (achievements[j][i].completed) {
                // shade different csolor if already done
                fill(171, 191, 171);
            }
            // shade yellow if mouse is over button
            if (mouseX > (i * 60 + 10) * (width / 400) && mouseX < ((i * 60 + 10) * (width / 400)) + (50 * (width / 400)) && mouseY > (j * 60 + 10) * (width / 400) && mouseY < ((j * 60 + 10) * (width / 400)) + 50 * (width / 400)) {
                fill(252, 255, 194);
            }
            rect((i * 60 + 10) * (width / 400), (j * 60 + 10) * (width / 400), 50 * (width / 400), 50 * (width / 400), 8 * (width / 400));
            fill(0, 0, 0);
            textSize(11 * (width / 400));
            textAlign(CENTER, CENTER);
            if (mouseX > (i * 60 + 10) * (width / 400) && mouseX < ((i * 60 + 10) * (width / 400)) + (50 * (width / 400)) && mouseY > (j * 60 + 10) * (width / 400) && mouseY < ((j * 60 + 10) * (width / 400)) + 50 * (width / 400)) {
                // replace text with how to get the achievement
                text(achievements[j][i].requirement, (i * 60 + 34) * (width / 400), (j * 60 + 34) * (width / 400));
            }
            else {
                // text
                text(achievements[j][i].name, (i * 60 + 34) * (width / 400), (j * 60 + 34) * (width / 400));
            }
        }
    }
    textAlign(LEFT, BASELINE);
    fill(255, 0, 0);
    if (mouseX > (325 * (width / 400)) && mouseX < (325 * (width / 400)) + (60 * (width / 400)) && mouseY > 10 * (width / 400) && mouseY < (10 * (width / 400)) + (27 * (width / 400))) {
        // shade differently when mouse is over
        fill(150, 0, 0);
    }
    rect(325 * (width / 400), 10 * (width / 400), 60 * (width / 400), 27 * (width / 400));
    textSize(22 * (width / 400));
    fill(0, 0, 0);
    text("EXIT", 330 * (width / 400), 32 * (width / 400));
};

var businessNum; // for achievement tracking

var updateAchievements = function() {
    // draw achievements
    achievementsButton();
    if (viewAchievements) {
        drawAchievements();
    }
    
    {
        // wake and bake
        if (cookies >= 10 && !achievements[0][0].completed) {
            achievements[0][0].completed = true;
        }
        // humble beginnnings
        if (cookies >= 500 && !achievements[0][1].completed) {
            achievements[0][1].completed = true;
        }
        // local media
        if (cookies >= 100000 && !achievements[0][2].completed) {
            achievements[0][2].completed = true;
        }
        // international
        if (cookies >= 1000000000 && !achievements[0][3].completed) {
            achievements[0][3].completed = true;
        }
        // cookie god
        if (cookies >= 1000000000000000000 && !achievements[0][4].completed) {
            achievements[0][4].completed = true;
        }
    }
    /*
    businesses[0] = pointer
    businesses[1] = grandma
    businesses[2] = farm
    businesses[3] = factory
    businesses[4] = mine
    businesses[5] = shipment
    businesses[6] = alchemy lab
    businesses[7] = portal
    businesses[8] = time machine
    businesses[9] = large collider
    businesses[10] = prism
    businesses[11] = war drive
    */
    
    // pointers
    {
        businessNum = businesses[0].number;
        if (businessNum >= 5 && !achievements[1][0].completed) {
            achievements[1][0].completed = true;
        }
        if (businessNum >= 200 && !achievements[1][1].completed) {
            achievements[1][1].completed = true;
        }
    }
    // grandmas
    {
        businessNum = businesses[1].number;
        if (businessNum >= 10 && !achievements[1][2].completed) {
            achievements[1][2].completed = true;
        }
        if (businessNum >= 250 && !achievements[1][3].completed) {
            achievements[1][3].completed = true;
        }
    }
    // farms
    {
        businessNum = businesses[2].number;
        if (businessNum >= 25 && !achievements[1][4].completed) {
            achievements[1][5].completed = true;
        }
        if (businessNum >= 250 && !achievements[1][5].completed) {
            achievements[1][5].completed = true;
        }
    }
    // factories
    {
        businessNum = businesses[3].number;
        if (businessNum >= 10 && !achievements[2][0].completed) {
            achievements[2][0].completed = true;
        }
        if (businessNum >= 250 && !achievements[2][1].completed) {
            achievements[2][0].completed = true;
        }
    }
    // mines
    {
        businessNum = businesses[4].number;
        if (businessNum >= 25 && !achievements[2][2].completed) {
            achievements[2][2].completed = true;
        }
        if (businessNum >= 100 && !achievements[2][3].completed) {
            achievements[2][3].completed = true;
        }
    }
    // shipments
    {
        businessNum = businesses[5].number;
        if (businessNum >= 5 && !achievements[2][4].completed) {
            achievements[2][4].completed = true;
        }
        if (businessNum >= 100 && !achievements[2][5].completed) {
            achievements[2][5].completed = true;
        }
    }
    // alchemy labs
    {
        businessNum = businesses[6].number;
        if (businessNum >= 5 && !achievements[3][0].completed) {
            achievements[3][0].completed = true;
        }
        if (businessNum >= 100 && !achievements[3][1].completed) {
            achievements[3][0].completed = true;
        }
    }
    // portals
    {
        businessNum = businesses[7].number;
        if (businessNum >= 5 && !achievements[3][2].completed) {
            achievements[3][2].completed = true;
        }
        if (businessNum >= 100 && !achievements[3][3].completed) {
            achievements[3][3].completed = true;
        }
    }
    // time machines
    {
        businessNum = businesses[8].number;
        if (businessNum >= 10 && !achievements[3][4].completed) {
            achievements[3][4].completed = true;
        }
        if (businessNum >= 100 && !achievements[3][5].completed) {
            achievements[3][5].completed = true;
        }
    }
    // large colliders
    {
        businessNum = businesses[9].number;
        if (businessNum >= 1 && !achievements[4][0].completed) {
            achievements[4][0].completed = true;
        }
        if (businessNum >= 250 && !achievements[4][1].completed) {
            achievements[4][0].completed = true;
        }
    }
    // large colliders
    {
        businessNum = businesses[10].number;
        if (businessNum >= 1 && !achievements[4][2].completed) {
            achievements[4][2].completed = true;
        }
        if (businessNum >= 50 && !achievements[4][3].completed) {
            achievements[4][3].completed = true;
        }
    }
    // large colliders
    {
        businessNum = businesses[11].number;
        if (businessNum >= 1 && !achievements[4][4].completed) {
            achievements[4][4].completed = true;
        }
        if (businessNum >= 50 && !achievements[4][5].completed) {
            achievements[4][5].completed = true;
        }
    }
};

var draw = function() {
    background(255, 233, 145, 100);
    
    drawCookie();
    displayData();
    
    // update cookies
    for (var i = 0; i < businesses.length; i++) {
        businesses[i].draw();
        businesses[i].addCookies();
    }
    
    // update cookies per click
    updateClickCookies();
    
    // kill particles & update
    for (var i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].updatePhysics();
        particles[i].update();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    for (var i = 0; i < pressedKeys.length; i++) {
        if (pressedKeys[i] === DOWN && yOffset < (businesses.length * 60) - 320) {
            yOffset += 2 * (width / 400);
        }
        else if (pressedKeys[i] === UP && yOffset > 50) {
            yOffset -= 2 * (width / 400);
        }
    }
    
    saveButton();
    prestigeButton();
    updateAchievements();
};
