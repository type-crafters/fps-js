import { Howl } from "howler";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

console.log(path.join("@assets", 'audio'))
// Get the absolute path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderPath = new URL(import.meta.url).pathname;
console.log(folderPath)

/**
 * SoundManager Class - Manages sound loading and playback using Howler.js
 * Implements Singleton pattern to ensure a single instance
 */
export class SoundManager {
    // Private static fields
    static #instance = null;
    static #sounds = new Map();
    static #basePath = `/assets/audio`;
    //static folderPath = path.join(__dirname, '../../', 'assets', 'audio');

    /**
     * Constructor - Singleton Pattern
     */
    constructor() {
        if (!SoundManager.#instance) {
            SoundManager.#instance = this;
        }
        return SoundManager.#instance;
    }

    /**
     * Load and cache a sound
     * @param {string} key - Unique identifier for the sound
     * @param {string|string[]} sources - Path(s) to the sound file(s)
     * @param {Object} options - Howler sound options
     * @returns {Howl|null} The created/cached Howl instance or null if error
     */
    loadSound(key, sources, options = {}) {
        if (!sources || (Array.isArray(sources) && sources.length === 0)) {
            console.error(`🔊 Error: Invalid source for sound "${key}"`);
            return null;
        }

        // Convert single source to array and resolve paths relative to public
        const resolvedSources = (Array.isArray(sources) ? sources : [sources])
            .map(src => {
                if (src.startsWith('http')) return src;
                return `${SoundManager.#basePath}/${src}`.replace(/\/+/g, '/');
            });

        // Create new Howl instance if not cached
        if (!SoundManager.#sounds.has(key)) {
            const howl = new Howl({
                src: resolvedSources,
                volume: options.volume ?? 1.0,
                html5: options.html5 ?? false,
                loop: options.loop ?? false,
                autoplay: options.autoplay ?? false,
                mute: options.mute ?? false,
                sprite: options.sprite ?? {},
                rate: options.rate ?? 1.0,
                format: ['mp3', 'wav'],
                onloaderror: (id, error) => {
                    console.error(`🔊 Error loading sound "${key}":`, error);
                },
                onplayerror: (id, error) => {
                    console.warn(`🔊 Error playing sound "${key}":`, error);
                    // Attempt to recover from playback error
                    const sound = SoundManager.#sounds.get(key);
                    if (sound) {
                        sound.once('unlock', () => sound.play());
                    }
                }
            });

            SoundManager.#sounds.set(key, howl);
        }

        return SoundManager.#sounds.get(key);
    }

    /**
     * Loads sound configuration from a JSON file
     * @param {string} configPath - Path to the sound configuration JSON
     * @returns {Promise<void>}
     */
    //async loadSoundConfig(configPath = '/assets/audio/sounds.json') {
    async loadSoundConfig() {
        try {
            const response = await fetch(`${SoundManager.#basePath}/files/sounds.json`);
            const config = await response.json();
            
            Object.entries(config.sounds).forEach(([key, soundData]) => {
                this.loadSound(key, soundData.sources, soundData.options);
            });
        } catch (error) {
            console.error('🔊 Error loading sound configuration: ', error);
        }
    }

    // Main sound control methods

    /**
     * Plays a sound
     * @param {string} key - Sound identifier
     * @param {number} [id] - Specific sound ID (for sprites)
     * @returns {number} Sound ID
     */
    play(key, id) {
        const sound = SoundManager.#sounds.get(key);
        if (!sound) {
            console.warn(`🔊 No sound loaded for key "${key}"`);
            return null;
        }
        return sound.play(id);
    }

    /**
     * Pauses a sound
     * @param {string} key - Sound identifier
     * @param {number} [id] - Specific sound ID
     */
    pause(key, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.pause(id);
    }

    /**
     * Stops a sound
     * @param {string} key - Sound identifier
     * @param {number} [id] - Specific sound ID
     */
    stop(key, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.stop(id);
    }

    // Advanced control methods

    /**
     * Stops a sound
     * @param {string} key - Sound identifier
     * @param {boolean} [muted] - True to mute and false to unmute
     * @param {number} [id] - Specific sound ID
     */
    mute(key, muted, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.mute(muted, id);
    }

    /**
     * Adjusts sound volume
     * @param {string} key - Sound identifier
     * @param {number} [volume] - Volume level (0.0 to 1.0)
     * @param {number} [id] - Specific sound ID
     */
    setVolume(key, volume, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.mute(volume, id);
    }

    /**
     * Performs a volume fade
     * @param {string} key - Sound identifier
     * @param {number} from - Initial volume
     * @param {number} to - Target volume
     * @param {number} duration - Duration in milliseconds
     * @param {number} [id] - Specific sound ID
     */
    fade(key, from, to, duration, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.fade(from, to, duration, id);
    }

    /**
     * Adjusts the rate of the sound playback
     * @param {string} key - Sound identifier
     * @param {number} [rate] - The rate of playback. 0.5 to 4.0, with 1.0 being normal speed
     * @param {number} [id] - Specific sound ID
     */
    rate(key, rate, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.rate(rate, id);
    }

    /**
     * Get/set the position of playback for a sound
     * @param {string} key - Sound identifier
     * @param {number} [seek] - The position to move current playback to (in seconds)
     * @param {number} [id] - Specific sound ID
     */
    seek(key, seek, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.seek(seek, id);
    }

    /**
     * Get/set whether to loop the sound or group
     * @param {string} key - Sound identifier
     * @param {number} [loop] - To loop or not to loop
     * @param {number} [id] - Specific sound ID
     */
    loop(key, loop, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.loop(loop, id);
    }

    /**
     * Loads a sound on memory,only needed if the preload Howl is setted on false
     * @param {string} key - Sound identifier
     * @returns {'unloaded'|'loading'|'loaded'}
     */
    state(key) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) return sound.state();
    }

    /**
     * Checks if a sound is currently playing
     * @param {string} key - Sound identifier
     * @param {number} [id] - Specific sound ID
     * @returns {boolean}
     */
    isPlaying(key, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) return sound.playing(id);
    }

    /**
     * Checks the duration of a sound
     * @param {string} key - Sound identifier
     * @param {number} [id] - Specific sound ID
     * @returns {number}
     */
    duration(key, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) return sound.duration(id);
    }

    /**
     * Checks if a sound is currently playing
     * @param {string} key - Sound identifier
     * @param {string} event - Name of the event to set
     * @param {Function} func - Define function to fire on event
     * @param {number} [id] - Only listen to events for this sound id
     * @returns {boolean}
     */
    on(key, event, func, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.on(event, func, id);
    }

    /**
     * Checks if a sound is currently playing
     * @param {string} key - Sound identifier
     * @param {string} event - Name of the event to set
     * @param {Function} func - Define function to fire on event
     * @param {number} [id] - Only listen to events for this sound id
     * @returns {boolean}
     */
    once(key, event, func, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.once(event, func, id);
    }

    /**
     * Checks if a sound is currently playing
     * @param {string} key - Sound identifier
     * @param {string} event - Name of the event to set
     * @param {Function} [func] - Define function to fire on event
     * @param {number} [id] - Only listen to events for this sound id
     * @returns {boolean}
     */
    off(key, event, func, id) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.off(event, func, id);
    }

    /**
     * Loads a sound on memory,only needed if the preload Howl is setted on false
     * @param {string} key - Sound identifier
     */
    load(key) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.load();
    }

    /**
     * Unloads a sound from memory
     * @param {string} key - Sound identifier
     */
    unload(key) {
        const sound = SoundManager.#sounds.get(key);
        if (sound) sound.unload();
    }
}

// Export singleton instance
//export const soundManager = new SoundManager();

//const sound = new SoundManager();
//sound.loadSounds();
//sound.playSound('menu_scroll', [`${SoundManager.folderPath}/menu/scroll-selection-sound.mp3`, `${SoundManager.folderPath}/menu/scroll-selection-sound.wav`]);