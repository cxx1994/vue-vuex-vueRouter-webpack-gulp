
const state = {
    team_s: {},
    region_s: {},
    organization_s: {},
    updateMenu: false
};

const getters = {
    team_s: state => state.team_s,
    region_s: state => state.region_s,
    organization_s: state => state.organization_s
};

const mutations = {
    changeTeam_s (state, data) {
        state.team_s= data
    },
    changeRegion_s (state, data){
        state.region_s = data
    },
    changeOrganization_s (state, data){
        state.organization_s = data
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