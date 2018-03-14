
import config from '../js/config'
import axios from 'axios'

export default {
    getAllOrganization : params => { return axios({method: 'GET', url: `${config.origin}/organization/getAllOrganization`, params}) },
    delOrganization : params => { return axios({method: 'POST', url: `${config.origin}/organization/delOrganization`, params}) },
    updateOrganization : params => { return axios({method: 'POST', url: `${config.origin}/organization/updateOrganization`, params}) },
    addOrganization : params => { return axios({method: 'POST', url: `${config.origin}/organization/addOrganization`, params}) },
};