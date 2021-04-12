import React from "react";

export default class Checker {
    /**
     * Was enter pressed?
     * @param {React.KeyboardEvent} e Event that was triggered by keypress
     * @param {() => void | undefined} trueCallback will be called if enter is pressed
     * @returns {boolean} if enter was pressed
     */
    public static isEnter(e: React.KeyboardEvent, trueCallback?: () => void): boolean {
        const isEnter = e.key === "Enter";
        if (isEnter && trueCallback)
            trueCallback();
        return isEnter;
    }
}
