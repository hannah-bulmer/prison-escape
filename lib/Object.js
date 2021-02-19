/**
 * Create an object or thing to interact with
 */
class Object {

    /**
     * Creates an object and takes all its parameters and translates them to variables
     * @param objectName the objectName of your object
     * @param description a  description of your object
     * @param planet the room location of your object (Planet)
     * @param canPickUp boolean to determine if you can pick up this object and put it in your inventory
     * @param canMove boolean to determine if you can move this object around its room
     * @param canTurnOn boolean to determine if you can turn on this object (flashlight)
     * @param canOpen boolean to determine if you can open or unlock this object
     * @param isWeapon boolean to determine if this object is a weapon
     */
    constructor(objectName, description, planet, canPickUp, canMove,
        canTurnOn, canOpen, isWeapon) {
        this.description = description
        this.planet = planet
        this.objectName = objectName
        this.canPickUp = canPickUp
        this.canMove = canMove
        this.canTurnOn = canTurnOn
        this.canOpen = canOpen
        this.isWeapon = isWeapon
    }

    /**
     * Determines if an object is in a certain room
     * @param planet the planet you want to check if the object is located in
     * @return true if the object is located there, false if it's not
     */
    isOnPlanet(planet) {
        return (this.getLocation() === planet)
    }

    /**
     * Accessor method for the location of an object
     * @return the location of an object
     */
    getLocation() {
        return this.planet
    }

    /**
     * Allows you to change the location of an object
     * @param place the location you'd like to move your object to
     */
    changeLocation(place) {
        this.planet = place
    }

    /**
     * Gets you the const objectName of the object's current location
     * @return the const objectName of the object's location, for printing
     */
    getPlanet() {
        return this.planet.getPlanetName()
    }

    /**
     * Accessor for the object's objectName
     * @return the const objectName of the object
     */
    get objectName() {
        return this.objectName
    }

    /**
     * Accessor for object's description
     * @return description of object
     */
    get description() {
        return this.description
    }

    /**
     * Allows you to change the description of an object
     * @param description The description you'd like to change your object to
     */
    changeDescription(description) {
        this.description = description
    }

    /**
     * Accessor for ability to turn on object
     * @return true if you can turn on the object, false if you cannot
     */
    get canTurnOn() {
        return this.canTurnOn
    }

    /**
     * Accessor for ability to pick up an object and put in inventory
     * @return true if you can pick the object up, false if you can't
     */
    get canPickUp() {
        return this.canPickUp
    }

    /**
     * Makes it so you can pick up an object you previosuly couldn't
     */
    nowCanPickUp() {
        this.canPickUp = true
    }

    /**
     * Accessor for ability to move an object around
     * @return true if you can move it, false if you can't
     */
    get canMove() {
        return this.canMove
    }

    /**
     * Accessor for ability to open an object
     * @return true if you can open / unlock it, false if you can't
     */
    get canOpen() {
        return this.canOpen
    }

    /**
     * Accessor for checking if an object is a weapon
     * @return true if it's a weapon, false if it's not
     */
    get isWeapon() {
        return this.isWeapon
    }
}