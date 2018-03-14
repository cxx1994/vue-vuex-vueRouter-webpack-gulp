<template>
    <el-dialog
            title="请选择团队"
            :visible.sync="teamVisible"
            width="30%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false">
        <el-cascader
                :options="options2"
                @active-item-change="handleItemChange"
                v-model="team"
                :props="props"
        > </el-cascader>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changeTeam">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "index-platform",
        data() {
            return {
                teamVisible: false,
                team: [],
                index: 1,
                options2: [{
                    label: '张医生团队',
                    cities: []
                }, {
                    label: '陈医生团队',
                    cities: []
                }],
                props: {
                    value: 'label',
                    children: 'cities'
                }
            }
        },
        methods: {
            ...mapMutations([
                'changeTeam_s',
                'changeRegion_s',
                'changeOrganization_s',
                'CHANGE_MENU'
            ]),
            changeTeam(){
                if(this.team.length){
                    this.changeTeam_s({name: this.team[this.team.length - 1]});
                    this.jump();
                }else{
                    this.$message.error('请选择团队！');
                }
            },
            jump(){
                this.teamVisible = false;
                this.$router.push('sign');
            },
            handleItemChange(val) {
                setTimeout(_ => {
                    if (val.indexOf('张医生团队') > -1 && !this.options2[0].cities.length) {
                        this.options2[0].cities = [{
                            label: '张三'
                        }];
                    } else if (val.indexOf('陈医生团队') > -1 && !this.options2[1].cities.length) {
                        this.options2[1].cities = [{
                            label: '陈二'
                        }];
                    }
                }, 300);
            }
        },
        created: function () {
        },
        mounted() {
            this.CHANGE_MENU(this.index);
            let hasChoiceTeam = !!this.team_s.name;
            if(hasChoiceTeam){
                this.jump();
                this.$notify.info({
                    title: '消息',
                    message: `当前团队为${this.team_s.name}，你可以在顶部菜单切换团队。`
                });
            }else{
                this.teamVisible = true;
            }
        },
        watch: {
        },
        computed: {
            ...mapGetters([
                'team_s',
                'region_s',
                'organization_s'
            ])
        }
    }
</script>

<style scoped>

</style>