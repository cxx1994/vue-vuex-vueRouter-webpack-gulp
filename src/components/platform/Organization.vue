<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" :disabled="true" placeholder="机构名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="true" @click="getOrganization">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="organization" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="mName" label="机构名" width="150" sortable>
            </el-table-column>
            <el-table-column prop="mLogo" label="LOGO" width="120" sortable>
                <template scope="scope">
                    <img :src="scope.row.mLogo" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="mPicture" label="封面图a" width="120" sortable>
                <template scope="scope">
                    <img :src="scope.row.mPicture" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="mCode" label="code码" width="180" sortable>
            </el-table-column>
            <el-table-column prop="mPhone" label="电话号码" width="180" sortable>
            </el-table-column>
            <el-table-column prop="mAddress" label="地址" width="180" sortable>
            </el-table-column>
            <el-table-column prop="mOrganizationTypeId" label="类型" min-width="180" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="mRemark" label="说明" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" :disabled="level<=1">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length<=1">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="机构名字" prop="mName" style="margin-bottom: 22px">
                    <el-input v-model="editForm.mName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="mCode">
                    <el-input v-model="editForm.mCode"></el-input>
                </el-form-item>
                <el-form-item label="机构地址" prop="mAddress">
                    <el-input v-model="editForm.mAddress"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="mPhone">
                    <el-input v-model="editForm.mPhone"></el-input>
                </el-form-item>
                <el-form-item label="机构类型" prop="mOrganizationTypeId">
                    <el-select v-model="editForm.mOrganizationTypeId" placeholder="请选择机构类型">
                        <template v-for="(value, key) in organizationType">
                            <el-option :label="value.mName" :value="value.mId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构介绍" prop="mRemark">
                    <el-input type="textarea" v-model="editForm.mRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="机构名字" prop="mName" style="margin-bottom: 22px">
                    <el-input v-model="addForm.mName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="机构编码" prop="mCode">
                    <el-input v-model="addForm.mCode"></el-input>
                </el-form-item>
                <el-form-item label="机构地址" prop="mAddress">
                    <el-input v-model="addForm.mAddress"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="mPhone">
                    <el-input v-model="addForm.mPhone"></el-input>
                </el-form-item>
                <el-form-item label="机构类型" prop="mOrganizationTypeId">
                    <el-select v-model="addForm.mOrganizationTypeId" placeholder="请选择机构类型">
                        <template v-for="(value, key) in organizationType">
                            <el-option :label="value.mName" :value="value.mId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构介绍" prop="mRemark">
                    <el-input type="textarea" v-model="addForm.mRemark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import verify from '../../js/verify'
    import api from '../../api/platform'

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                organization: [],
                organizationType: [{'mId': 1, 'mName': '医院'}, {'mId': 2, 'mName': '卫生中心'}],
                total: 0,
                page: 1,
                pageSize: 4,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    mName: [{ required: true, message: '请输入机构名字', trigger: 'blur' }],
                    mCode: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
                    mAddress: [{ required: true, message: '请输入机构地址', trigger: 'blur' }],
                    mPhone: [{ required: true, validator: verify.isMobil, trigger: 'blur' }],
                    mOrganizationTypeId: [{ type: 'number', required: true, message: '请选择机构类型', trigger: 'change' }],
                    mRemark: [{ required: true, message: '请填写说明', trigger: 'blur'}]
                },
                //编辑界面数据
                editForm: {
                    _id: '',
                    mId: '',
                    mAreaId: '',
                    mName: '',
                    mCode: '',
                    mAddress: '',
                    mPhone: '',
                    mOrganizationTypeId: '',
                    mLogo: '',
                    logoFiles:'',
                    mPicture: '',
                    pictureFiles: '',
                    mRemark: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    mName: [{ required: true, message: '请输入机构名字', trigger: 'blur' }],
                    mCode: [{ required: true, message: '请输入机构编码', trigger: 'blur' }],
                    mAddress: [{ required: true, message: '请输入机构地址', trigger: 'blur' }],
                    mPhone: [{ required: true, validator: verify.isMobil, trigger: 'blur' }],
                    mOrganizationTypeId: [{ type: 'number', required: true, message: '请选择机构类型', trigger: 'change' }],
                    mRemark: [{ required: true, message: '请填写说明', trigger: 'blur'}]
                },
                //新增界面数据
                addForm: {
                    mName: '',
                    mCode: '',
                    mAddress: '',
                    mPhone: '',
                    mOrganizationTypeId: '',
                    mLogo: '',
                    mPicture: '',
                    mRemark: ''
                }

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                let typeName = '';
                this.organizationType.forEach((value) => {
                    if(value.mId == row.mOrganizationTypeId) typeName = value.mName;
                });
                return typeName;
                //return this.organizationType[row.mOrganizationTypeId].mName;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getOrganization();
            },
            //改变机构后刷新左侧菜单
            updateMenu(){
                this.$store.commit('updateMenu');
            },
            //获取用户列表
            getOrganization() {
                this.listLoading = true;
                api.getAllOrganization({
                    pageIndex: this.page,
                    pageSize: this.pageSize
                }).then((res) => {
                    this.listLoading = false;
                    this.organization = res.data.result.data || [];
                    console.log(this.organization);
                    this.total = res.data.result.total;
                }, (res) => {
                    this.listLoading = false;
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    api.delOrganization({
                        _id: row._id
                    }).then(() => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getOrganization();
                        //this.updateMenu();
                    }, function () {
                        this.$message({
                            message: '删除失败',
                            type: 'error'
                        });
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign(this.editForm, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    mName: '',
                    mCode: '',
                    mAddress: '',
                    mPhone: '15708479080',
                    mOrganizationTypeId: '',
                    mLogo: '',
                    mPicture: '',
                    mRemark: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            api.updateOrganization(this.editForm).then(function(response) {
                                return response.data.code;
                            }, (err) => {
                                this.editLoading = false;
                                this.$message.error('添加失败');
                            }).then((res) => {
                                this.editLoading = false;
                                if(res == 200){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['editForm'].resetFields();
                                    this.editFormVisible = false;
                                    this.getOrganization();
                                    this.updateMenu();
                                }else{
                                    this.$message.error('添加失败');
                                }
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            api.addOrganization(this.addForm).then(function(response) {
                                console.log(response);
                                return response.data.code === 200;
                            }, function(err) {
                                this.$message.error('添加失败！');
                            }).then((text) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getOrganization();
                                //this.updateMenu();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                let ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getOrganization();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getOrganization();
        },
        watch: {
            Address: function(){
                this.getOrganization();
            }
        },
        computed: {
            Address () {
                return this.$store.state.currentAddress
            },
            level () {
                return this.$store.state.level
            }
        }
    }

</script>