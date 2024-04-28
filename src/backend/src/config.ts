import { TServerConfig } from './server'
const fs = require('fs');
const yaml = require('js-yaml');

export type TEnv = 'production' | 'test' | 'development'
export type TConfig = {
    env: TEnv
    server: TServerConfig
}


export const loadConfigFromYAML = (filePath:string) => {
    try {
        // Odczytaj zawartość pliku YAML
        const yamlData = fs.readFileSync(filePath, 'utf8');

        // Parsowanie danych YAML do obiektu JavaScript
        const config = yaml.load(yamlData);

        return config;
    } catch (error) {
        console.error('Błąd podczas wczytywania pliku YAML:', error);
        return null;
    }
}


const env = (process.env.NODE_ENV || 'production') as TEnv
const API_PORT = 5000
export const config: TConfig = {
    env,
    server: {
        port: API_PORT,
        corsOptions:
            env === 'development' ? { origin: 'localhost:' + API_PORT } : {},
        limiter: {
            time: 15 * 60 * 1000,
max: 250, }}}
