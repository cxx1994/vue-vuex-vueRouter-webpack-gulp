
import config from '../js/config'
import axios from 'axios'

export const requestLogin = params => { return axios({method: 'POST', url: `${config.origin}/login`, params}) };