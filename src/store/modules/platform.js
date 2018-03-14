
const state = {
    team_p: {},
    region_p: {},
    organization_p: {},
    updateMenu: false
};

const getters = {
    team_p: state => state.team_p,
    region_p: state => state.region_p,
    organization_p: state => state.organization_p
};

const mutations = {
    changeTeam_p (state, data) {
        state.team_p= data
    },
    changeRegion_p (state, data){
        state.region_p = data
    },
    changeOrganization_p (state, data){
        state.organization_p = data
    },
    updateMenu (state){
        state.updateMenu = !state.updateMenu
    }
};

const actions = {};
export default {
    state,
    getters,
    actions,
    mutations
}