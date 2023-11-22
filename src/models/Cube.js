const fs = require('fs/promises');
let db = require('../db.json');
const path = require('path');

class Cube {
    constructor(name, description, imageUrl, difficultyLevel) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }
    static async save(cube) {

        try {
            const filePath = path.resolve(__dirname, '../db.json');
            
            if (!db.cubes) {
                db.cubes = [];
            }
            db.cubes.push(cube);
            
            const jsonData = JSON.stringify(db, null, 2);
            await fs.writeFile(filePath, jsonData);
        } catch (error) {
            console.error('Error saving cube:', error);
        }
    }
};

module.exports = Cube;