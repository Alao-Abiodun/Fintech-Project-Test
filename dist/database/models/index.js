'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = __importDefault(require("sequelize"));
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/index');
const database = (options) => {
    const db = {};
    const { environment } = options;
    let sequelize = new sequelize_1.default(config.db[environment].uri, config.db[environment].sequelize);
    fs_1.default
        .readdirSync(__dirname)
        .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
        .forEach(file => {
        const model = require(path_1.default.join(__dirname, file))(sequelize, sequelize_1.default.DataTypes);
        db[model.name] = model;
    });
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = sequelize_1.default;
    return db;
};
exports.default = database;
