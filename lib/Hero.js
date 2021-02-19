class Hero {
    //in caps because the size of your inventory will NEVER change okay
    INVENTORY_SIZE = 5;
    health = 100;

    /**
     * Creates the main object in the game (a hero)
     * @param location the starting room of your charater.
     */
    Hero(location) {
        currentPlanet = location;
        inventory = []
    }

    /**
     * Prints out your inventory
     * @return the arraylist of all your posessions
     */
    getInventory() {
        hasPossessions = false;
        inventorySize = this.inventory.length
        console.log("\nYour inventory currently consists of: ")
        if(!inventorySize) {
            console.log("- ...oh wait. It seems you're not carrying anything.")
        }

        for (a = 0; a < inventorySize; a++) {
            console.log(`- ${inventory[a]}`)
        }

        return inventory;
    }

    /**
     * Transports you to another room without having to move
     * @param planet Your new location
     */
    transport(planet) {
        //updates current location variable 
        this.currentPlanet = planet;
    }

    /**
     * Gets the name of your current location
     * @return The string name of your current location
     */
    currentPlanet() {
        return this.currentPlanet.getPlanetName();
    }

    /**
     * Gets the computery name of your current room
     * @return Your current Planet
     */
    get currentLocation() {
        return this.currentPlanet;
    }

    /**
     * Moves you to different rooms and looks really complicated but isn't?
     * @param hero The titular character in your game needs to be rereferenced here to make it work
     * @param direction "n", "s", "e", or "w" string depending on which way you want to move
     */
    move(hero, direction) {
        //checks if to the north/south/east/etc of your current location, there is a door
        east = hero.currentLocation.connectEast(hero.currentLocation, hero.currentLocation.lookEast(hero));
        west = hero.currentLocation.connectWest(hero.currentLocation, hero.currentLocation.lookWest(hero));

        if (direction.equals('n') || direction.equals('N')) {
            north = hero.currentLocation.connectNorth(hero.currentLocation, hero.currentLocation.lookNorth(hero))
            if (north) {
                northRoom = hero.currentLocation.lookNorth(hero);
                if (northRoom.getPlanetDescription() == "void") {
                    console.log("You can't go that way.")
                }
                else {
                    this.currentPlanet = northRoom;
                    console.log(`\nYou moved north into ${this.currentPlanet.getPlanetName()}`)
                }
            }
        }

        if (direction.equals('s') || direction.equals('S')) {
            south = hero.currentLocation.connectSouth(hero.currentLocation, hero.currentLocation.lookSouth(hero));
            if (south) {
                room = hero.currentLocation.lookNorth(hero);
                if (room.getPlanetDescription() == "void") {
                    console.log("You can't go that way.")
                }
                else {
                    this.currentPlanet = room;
                    console.log(`\nYou moved south into ${this.currentPlanet.getPlanetName()}`)
                }
            }
        }

        if (direction.equals('e') || direction.equals('E')) {
            east = hero.currentLocation.connectEast(hero.currentLocation, hero.currentLocation.lookEast(hero))
            if (east) {
                room = hero.currentLocation.lookNorth(hero);
                if (room.getPlanetDescription() == "void") {
                    console.log("You can't go that way.")
                }
                else {
                    this.currentPlanet = room;
                    console.log(`\nYou moved east into ${this.currentPlanet.getPlanetName()}`)
                }
            }
        }

        if (direction.equals('w') || direction.equals('W')) {
            west = hero.currentLocation.connectWest(hero.currentLocation, hero.currentLocation.lookWest(hero))
            if (west) {
                room = hero.currentLocation.lookNorth(hero);
                if (room.getPlanetDescription() == "void") {
                    console.log("You can't go that way.")
                }
                else {
                    this.currentPlanet = room;
                    console.log(`\nYou moved west into ${this.currentPlanet.getPlanetName()}`)
                }
            }
        }
    }

    /**
     * Pick up things and put them in your inventory
     * @param thing The object you want to pick up
     */
    pickUp(thing) {
        //get's the object's name to put in the inventory
        object = thing.objectName;
        //if it's in the room
        if (thing.getLocation() == this.currentLocation()) {
            //if you can pick it up
            if (thing.canPickUp) {
                //if your inventory is full
                if (this.inventorySize(inventory) >= INVENTORY_SIZE) {
                    console.log(`Sorry, you can't pick up ${object} because your inventory is full`)
                }
                //otherwise, you can pick it up
                else {
                    //I'm not sure why there's a loop here since it doesn't seem to need it (must've removed something)
                    //but I don't want to take it out becasue everything works and I don't want to ruin it
                    //it was probably for picking up multiple objects before I moved it to a separate method
                    for (a = 0; a < INVENTORY_SIZE; a++) {
                        if (this.inventory.size() < INVENTORY_SIZE) {
                            //add the object to the inventory and the object to the other inventory
                            this.inventory.push(thing);
                            //print it out
                            console.log(`You picked up ${object}`)
                            //remove the object from the room
                            this.currentLocation().removeObject(thing);
                            break;
                        }
                    }
                }
            }
            else {
                //if it's unpickupable, it must be too heavy...
                console.log(`Sorry, you can't pick up the ${object}. It's too heavy.`)
            }
        }
        else {
            //just deals with general error problems of having an object exist, but in another room
            console.log(`Sorry, you seem to be in a different room than that object.`)
        }
    }

    /**
     * Drop objects from your inventory and place them back in the current room
     * @param thing The object you're dropping
     */
    drop(thing) {
        //gets name of the object
        object = thing.objectName();
        //go through inventory and find the location of the object
        for (a = 0; a < inventorySize(inventory); a++) {
            if (inventory.get(a).equalsIgnoreCase(object)) {
                System.out.println("\nYou dropped: " + object);
                //take it out of BOTH inventories
                inventory.remove(a);
                inventoryO.remove(thing);
            }
        }

        //no one actually cares if you drop a weapon but whatever
        if (thing.isWeapon()) {
            System.out.println("Unfortunately, dropping a weapon really brought down your attack ability. Sorry!");
        }

        //places the dropped object into the room you're currently in instead of having it float back to its orginal room
        currentLocation().placeObject(thing);
        thing.changeLocation(currentLocation());
    }

    /**
     * Drops everything currently in your inventory and puts it in your current room
     */
    dropAll() {
        //goes through your inventory
        for (a = 0; a < inventorySize(inventory); a++) {
            //if it's something you can pick up
            if (inventoryO.get(a).canPickUp()) {
                //place it in the room!
                currentLocation().placeObject(inventoryO.get(a));
                inventoryO.get(a).changeLocation(currentLocation());
            }
        }
        //print out that you've dropped it
        for (a = 0; a < inventorySize(inventory); a++) {
            System.out.println("- " + inventory.get(a) + ": dropped.");
        }
        //CLEAR THE INVENTORY
        inventory.clear();
        inventoryO.clear();
        //for some reason the inventory of Objects does not need to be cleared? Okay...
    }

    /**
     * Picks up all pick-upable objects in your current room
     */
    pickUpAll() {
        //the number of objects in the current room
        objectNumber = currentLocation().objectsOnPlanet().size();
        object;
        countPickedUp = 0;
        //the objects you need to pick up (now in nice ArrayList format)
        ArrayList < Object > toPickUp = new ArrayList<>();
        toPickUp = currentLocation().objectsOnPlanet();
        ArrayList < Object > thingsPickedUp = new ArrayList<>();
        //go through every object in that arraylist
        for (a = 0; a < objectNumber; a++) {
            //gets object's name
            object = toPickUp.get(a).objectName();
            //if it's in that room (which it is, but nice to check I suppose)
            if (toPickUp.get(a).isOnPlanet(currentLocation())) {
                //if you can pick it up
                if (toPickUp.get(a).canPickUp()) {
                    //if your inventory is full...
                    if (countPickedUp >= INVENTORY_SIZE) {
                        while (a < objectNumber) {
                            //print this out for every object after your inventory is full
                            //this will literally never be a problem in this simple game but whatever
                            System.out.println("- " + object + ": you don't have room for this object.");
                            a++;
                        }
                        break;
                    }
                    //add the objects to both arrays
                    inventory.add(object);
                    inventoryO.add(toPickUp.get(a));

                    System.out.println("- " + object + ": taken.");
                    //count the objects picked up to see when your inventory is full
                    thingsPickedUp.add(toPickUp.get(a));
                    countPickedUp += 1;
                }
                else {
                    //if it's unpickupable, print this
                    System.out.println("- " + object + ": you cannot take this object.");
                }
            }
        }

        for (a = 0; a < thingsPickedUp.size(); a++) {
            //planet you're on.removeObject(from this array take different objects)
            //object = planet.objectsOnPlanet() = array of objects on planet. get 0, 1, 2, 3 (in object form)
            //planet.removeObject(0 from the array)

            //takes the each object you picked up and removes it from the room
            currentLocation().removeObject(thingsPickedUp.get(0));
        }
    }

    /**
     * Turns lights on and stuff
     * @param object The thing you want to turn on
     * @return true if you can turn on the object, false if you can't
     */
    turnOn(object) {
        if (object.canTurnOn()) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Checks if an oject is on
     * @param object The object you want to check the status of
     * @return true if the object is on, false if it's not
     */
    hasTurnedOn(object) {
        if (turnOn(object)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Moves objects (away from doors and stuff)
     * @param object The object you want to move
     * @return true if you can move it (and therefore have), false if you can't.
     */
    moveObject(object) {
        if (object.canMove()) {
            System.out.println("You moved the " + object.objectName() + ".");
            return true;
        }
        else {
            System.out.println("Sorry, you can't move this " + object.objectName() + ".");
            return false;
        }
    }

    /**
     * Opens or unlocks objects
     * @param object The object you want to open/unlock
     * @return true if object has been opened, false if it hasn't
     */
    open(object) {
        if (object.canOpen()) {
            System.out.println("The " + object.objectName() + " opened.");
            return true;
        }
        else {
            System.out.println("You are unable to open " + object.objectName() + ".");
            return false;
        }
    }

    /**
     * FIGHTING THINGS LOOK MUCH WOW VERY EXCITING
     * (aka the BEST PART OF THE CODE)
     * @param monster The thing you're gonna fight
     * @param haveWeapon Sees if you're holding a weapon to see if you get bonus points or something
     * @return true if you win the fight, false if you lose.
     */
    fight(Monster monster, haveWeapon) throws InterruptedException
    {
    Random random = new Random();

    //OUTCOME PHRASES
    fightWin1 = "\nYou knee the guard in the groin.";
    fightWin2 = "\nYou punch the guard in the face.";
    fightWin3 = "\nYou elbow the guard in the stomach, and he doubles over in pain.";
    fightWin4 = "\nYou stomp on the guard's foot.";
    fightWin5 = "\nYou twist the guard's arm around painfully.";

    fightLose1 = "\nThe guard whips his gun out at you and you trip over backwards.";
    fightLose2 = "\nThe guard gets you in a headlock.";
    fightLose3 = "\nThe guard punches you in the stomach.";
    fightLose4 = "\nThe guard tickles you until you collapse dramatically.";
    fightLose5 = "\nThe guard pulls your hair. It hurts.";

    //getting their health
    theirHealth = monster.health();
    //the way the fighting works is that you get a random number from 0 to your "health" number, and so does
    //your rival, and whoever has the bigger one gets a hit.
    //so, mostly chance, but whatever.
    yourNumber;
    theirNumber;
    //you each need five hits to get knocked out, unless you have a weapon
    yourHits = 5;
    theirHits = 5;
    //pause in the code is currently 1.1 seconds
    sleep = 1100;

    [] randomNumber = new [yourHits];
    for (a = 0; a < 5; a++) {
        //makes an array of five random numbers between 0 and 4
        one = random.nextInt(5);
        randomNumber[a] = one;
        //System.out.println(randomNumber[a]);
    }

    System.out.println("\nA guard has rounded the corner!");
    Thread.sleep(sleep);
    if (haveWeapon) {
        theirHits = 3;
        System.out.println("\nNervously, you finger the gun in your pocket.");
        Thread.sleep(sleep);
        System.out.println("\nThe guard sees your weapon and very audibly gulps. He is nervous.");
        Thread.sleep(sleep);
    }
    System.out.println("You charge at the guard head on, and the battle begins.");
    while (yourHits > 0 && theirHits > 0) {
        for (a = 0; a < 5; a++) {
            //calculate random numbers for both of you
            yourNumber = random.nextInt(health + 1);
            theirNumber = random.nextInt(theirHealth + 1);
            Thread.sleep(sleep);
            //if your number is higher, take Random Number # 1 and print the statement for it
            //this way you get a bunch of random statements coming like a vaguely realish fight
            if (yourNumber >= theirNumber) {
                if (randomNumber[a] == 0)
                    System.out.println(fightWin1);
                if (randomNumber[a] == 1)
                    System.out.println(fightWin2);
                if (randomNumber[a] == 2)
                    System.out.println(fightWin3);
                if (randomNumber[a] == 3)
                    System.out.println(fightWin4);
                if (randomNumber[a] == 4)
                    System.out.println(fightWin5);
                theirHits--;
            }
            //and do the same for your opponent
            else {
                if (randomNumber[a] == 0)
                    System.out.println(fightLose1);
                if (randomNumber[a] == 1)
                    System.out.println(fightLose2);
                if (randomNumber[a] == 2)
                    System.out.println(fightLose3);
                if (randomNumber[a] == 3)
                    System.out.println(fightLose4);
                if (randomNumber[a] == 4)
                    System.out.println(fightLose5);
                yourHits--;
            }
        }
        //stop when one of your hits you're able to take reaches 0
    }
    Thread.sleep(sleep);
    //if you still have more than 0 left, you win!
    if (yourHits > 0) {
        System.out.println("\nSuccess! You incapacitated the guard! Now get out of there...");
        return true;
    }
    //otherwise you've lost :(
    else {
        System.out.println("\nDamn, that guard was good. Looks like you're beat.");
        Thread.sleep(sleep);
        System.out.println("The guard knocks you out and puts a bag over your head.");
        return false;
    }
}
}