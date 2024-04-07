const nodeEnv: 'dev' | 'prod' = 'dev';

export const environment = {
    baseURL: nodeEnv === 'dev' ? 'http://localhost:3000' : '',
    APIbaseURL: nodeEnv === 'dev' ? 'http://localhost:3333' : ''
}