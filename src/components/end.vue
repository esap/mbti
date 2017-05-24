<template>
<div>
  <div style="color:red;text-align: center;padding:10px">
    恭喜，您已完成了所有试题，感谢参与，请与人事联系。
  </div>
<div class="info-form">
<el-form ref="form" :model="$store.state.form" label-width="80px">
  <el-form-item label="姓名">
  <!-- <el-col :span="13"> -->
    <el-input disabled v-model="$store.state.form.name"></el-input>
  <!-- </el-col> -->
  </el-form-item>
  <el-form-item label="性别">
  <!-- <el-col :span="11"> -->
    <el-radio-group disabled v-model="$store.state.form.gender">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  <!-- </el-col> -->
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input disabled v-model="$store.state.form.mobile" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="应聘岗位">
    <el-select disabled v-model="$store.state.form.position" placeholder="请选择应聘岗位">
      <el-option label="内销" value="内销"></el-option>
      <el-option label="外贸" value="外贸"></el-option>
      <el-option label="工程" value="工程"></el-option>
      <el-option label="设计" value="设计"></el-option>
    </el-select>
  </el-form-item>  
  <el-form-item label="文化程度">
    <el-select disabled v-model="$store.state.form.edu" placeholder="请选择应聘岗位">
      <el-option label="高中" value="高中"></el-option>
      <el-option label="大专" value="大专"></el-option>
      <el-option label="本科" value="本科"></el-option>
      <el-option label="硕士" value="硕士"></el-option>
      <el-option label="博士" value="博士"></el-option>
      <el-option label="其它" value="其它"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="生日">
      <el-date-picker disabled type="date" placeholder="选择生日" v-model="$store.state.form.birth" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="备注">
    <el-input disabled type="textarea" v-model="$store.state.form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" size="large" @click="onSubmit">重新开始</el-button>
    <!-- <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
</div>
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {   
      onSubmit() {
        this.$store.state.form.date1= this.$moment().format('YYYY-MM-DD HH:MM:SS');
        console.log(this.$store.state.form.date1);
        window.location="/mbti"
      }
    },
    activated(){
      this.$store.state.active=6
    }
  }
</script>