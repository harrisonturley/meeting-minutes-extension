/**
 * Purpose: Provide an abstraction of a message
 */
export default class Message {
    name;
    text;

    constructor() {
        this.name = "Unknown";
        this.text = "";
    }
}