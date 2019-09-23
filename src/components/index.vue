<template>
<div class="info-form">
<el-form ref="form" :model="$store.state.form" label-width="80px">
  <el-form-item label="姓名">
    <el-input placeholder="请填写您的姓名" v-model="$store.state.form.name"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio-group v-model="$store.state.form.gender">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="$store.state.form.mobile" placeholder="请填写您的联系电话" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="应聘岗位">
    <el-select v-model="$store.state.form.position" placeholder="请选择应聘岗位">
      <el-option label="销售" value="销售"></el-option>
      <el-option label="前端" value="前端"></el-option>
      <el-option label="后端" value="后端"></el-option>
      <el-option label="产品" value="产品"></el-option>
      <el-option label="架构" value="架构"></el-option>
    </el-select>
  </el-form-item>  
  <el-form-item label="文化程度">
    <el-select v-model="$store.state.form.edu" placeholder="请选择文化程度">
      <el-option label="高中" value="高中"></el-option>
      <el-option label="大专" value="大专"></el-option>
      <el-option label="本科" value="本科"></el-option>
      <el-option label="硕士" value="硕士"></el-option>
      <el-option label="博士" value="博士"></el-option>
      <el-option label="其它" value="其它"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="生日">
      <el-date-picker type="date" format placeholder="选择生日" v-model="$store.state.form.birth" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" placeholder="可填写您的特长，爱好等" v-model="$store.state.form.rem"></el-input>
  </el-form-item>
  <el-form-item>
    <Button type="primary" :loading="loading" size="large" :disabled="valid" @click="onSubmit">开始答题</Button>
  </el-form-item>
</el-form>
</div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: [],
          loading: false
        }
      },
      computed:{
        valid(){
          return !this.$store.state.form.name || !this.$store.state.form.mobile || !this.$store.state.form.birth
        }
      },
      methods: {
        postData() {
          this.loading=true
          this.$http.post(this.$tokenes("FABE综合试题?db=esap2"), this.$store.state.form)
          .then(r=> {
            if(r.data.result){
              this.$store.state.form.rcid=r.data.rcid
              this.$store.state.form.rtid=r.data.rtid
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.loading=false
              this.$router.push("/vda") 
            } else {
              this.loading=false
              this.$notify({
                title: '提交失败',
                message: h('i', { style: 'color: teal'}, r.data.errmsg)
              });
            } 
          })
          .catch(e=> {
            this.loading=false
            console.log(e)
            this.$notify({
              title: '提交失败',
              message: h('i', { style: 'color: teal'}, e)
            })
          })
        },
        onSubmit() {
          this.$store.state.form.date2 = this.$store.state.form.date1 = this.$moment().format('YYYY-MM-DD HH:mm:ss')
          this.$store.state.form.birth= this.$moment(this.$store.state.form.birth).format('YYYY-MM-DD')
          this.$store.state.form.data1=this.$store.state.form.data2=[]
          this.postData()          
        }
      },
      activated(){
        this.$store.state.active=0
      }
    }
  </script>

<style>
.info-form {
  width: 400px;
  margin: 5% auto;
}
</style>