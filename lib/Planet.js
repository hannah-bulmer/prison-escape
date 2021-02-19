class Planet {
    /**
     * Creates a room, but does not give it doorways or a description
     * @param name The string name of the room that will be used in printing
     * @param description The string description of the room
     * @param beenHere Always false when creating room: determines if you've been in the room or not
     */
    constructor(planetName, description, beenHere) {
        this.description = description
        this.planetName = planetName
        this.beenHere = beenHere
        this.north = null
        this.south = null
        this.east = null
        this.west = null
        this.nonExistant = null
        this.existEast = false
        this.existNorth = false
        this.existSouth = false
        this.existWest = false
        this.objects = []
    }

    /**
     * Changes parameter to say you've previously entered the room, so you don't get the description twice
     */
    beenHere() {
        this.beenHere = true
    }

    /**
     * If you haven't entered the room before, print the description
     */
    hasntEnteredBefore() {
        if (!this.beenHere) {
            console.log(this.getPlanetDescription())
        }
    }

    /**
     * Connect two rooms through a north door (when called, do firstPlanet.connectNorth(firstPlanet, secondPlanet))
     * @param b the north room
     * @return always return true when calling this method
     */
    connectNorth(b) {
        //saves the second planet as being north of the first one
        this.north = b
        //says that something exists to the north of the room
        this.existNorth = true
        return true
    }

    /**
     * Connect two rooms through a south door
     * @param b the south room
     * @return always return true when calling this method
     */
    connectSouth(b) {
        this.south = b
        this.existSouth = true
        return true
    }

    /**
     * Connect two rooms through an east door
     * @param b the east room
     * @return always return true when calling this method
     */
    connectEast(b) {
        this.east = b
        this.existEast = true
        return true
    }

    /**
     * Connect two rooms through a west door
     * @param b the west room
     * @return always return true when calling this method
     */
    connectWest(b) {
        this.west = b
        this.existWest = true
        return true
    }

    /**
     * Checks if there is a planet to the north of where you currently are
     * @return the planet to the north if there is one, or the planet if there isn't one
     */
    lookNorth(hero) {
        //this is why those variables are important, and when it only returns true
        //because the Exist variable covers the true/false, so it has to always return true
        //so if there is a planet to the north, and you are connected to it, return the planet
        if ((this.existNorth) && (this.connectNorth(hero.currentLocation(), this.north))) {
            return this.north
        }
        else {
            this.nonExistant = new Planet("You can't go that way.", "void", false)
            return this.nonExistant
        }
    }

    /**
     * Checks if there is a planet to the south of where you currently are
     * @return the planet to the south if there is one, or planet if there isn't one
     */
    lookSouth(hero) {
        if ((this.existSouth) && (this.connectSouth(hero.currentLocation(), this.south))) {
            return this.south
        }
        else {
            this.nonExistant = new Planet("You can't go that way.", "void", false)
            return this.nonExistant
        }
    }

    /**
     * Checks if there is a planet to the east of where you currently are
     * @return the planet to the east if there is one, or planet if there isn't one
     */
    lookEast(hero) {
        if ((this.existEast) && (this.connectEast(hero.currentLocation(), this.east))) {
            return this.east
        }
        else {
            this.nonExistant = new Planet("You can't go that way.", "void", false)
            return this.nonExistant
        }
    }

    /**
     * Checks if there is a planet to the west of where you currently are
     * @return the planet to the west if there is one, or planet if there isn't one
     */
    lookWest(hero) {
        if ((this.existWest) && (this.connectWest(hero.currentLocation(), this.west))) {
            return this.west
        } else {
            this.nonExistant = new Planet("You can't go that way.", "void", false)
            return this.nonExistant
        }
    }

    /**
     * Adds an object to the arraylist of objects in that room, so when you look at all the objects in the room
     * it comes up
     * @param object the object you are placing in the room
     */
    placeObject(object) {
        this.objects.add(object)
    }

    /**
     * Removes an object from that room's arraylist
     * @param object the object you are moving from the room
     */
    removeObject(object) {
        //loop goes through array and finds the object to delete it
        numObjects = this.objects.size()
        for (a = 0; a < numObjects; a++) {
            if (this.objects[a] == object) {
                this.objects.pop(a)
            }
        }
    }

    /**
     * Prints out all the objects currently in the room as per the arraylist
     */
    checkForObjects() {
        room = this.getPlanetName()
        numObjects = this.objects.size()
        printed = false
        console.log(`\nThe room ${room} contains: `)

        if (!numObjects) {
            console.log('- ...wait. There is nothing here.')
            return
        }

        for (a = 0; a < numObjects; a++) {
            console.log(`- ${objects[a].objectName()}`)
        }
    }

    /**
     * Gets you all the computery names of all the objects in the arraylist of that room
     * @return the arraylist of all the objects in that room
     */
    get objectsOnPlanet() {
        return this.objects
    }

    /**
     * Accessor method for the description of the room
     * @return The description of the room
     */
    get planetDescription() {
        return this.description
    }

    /**
     * Accessor method for the name of the room
     * @return The name of the room
     */
    get planetName() {
        return this.planetName
    }

    /**
     * Allows you to rewrite the description of a room and save it to the variable
     * @param description The new description you want to replace the other one with
     */
    changeDescription(description) {
        this.description = description
    }
}