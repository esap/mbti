<template>
  <div>
  <div style="color:red">
说明：本项目共计64个题目，请为每题选择一个代表你真实想法的分数，在10分钟内完成，谢谢！
  </div>
  {{amt}}
    <el-table
      height="630"
      stripe border
      :data="tableData"
      style="width: 100%">
    <el-table-column
      type="index"
      width="80">
    </el-table-column>
      <el-table-column
        prop="desc"
        width="360"
        label="试题">
      </el-table-column>
      <el-table-column
        label="倾向选择"
        width="600">     
        <template scope="scope">
            <el-radio-group v-model="scope.row.vab" @change="v=>{
              scope.row.f1=(v=='f1'?1:0)
              scope.row.f2=(v=='f2'?1:0)
              scope.row.f3=(v=='f3'?1:0)
              scope.row.f4=(v=='f4'?1:0)
              scope.row.f5=(v=='f5'?1:0)
              }">
              <el-radio class="radio" label="f1">完全符合</el-radio>
              <el-radio class="radio" label="f2">大部分符合</el-radio>
              <el-radio class="radio" label="f3">一般符合</el-radio>
              <el-radio class="radio" label="f4">偶尔符合</el-radio>
              <el-radio class="radio" label="f5">完全不是</el-radio>
            </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <br />
  <div class="float-footer">
    <Button type="primary" :loading="loading" style="margin-top: 12px;" :disabled="!ok" @click="next">下一步</Button>
  </div>
  </div>
</template>

  <script>
  import ds from '@/data/vda'
    export default {
      data() {
        return {
          tableData: ds.dataTable,
          loading: false
        }
      },
      computed:{
        amt(){
          return this.tableData.reduce((p,v,i,arr)=> v.f1+v.f2+v.f3+v.f4+v.f5+p,0)
        },
        ok(){
          return this.amt==64
        },
      },
      methods: {
        postData() {
          this.loading=true
          this.$http.post(this.$token("vda"),this.$store.state.form)
          .then(r=> {
            this.loading=false
            if(r.data.result){
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.$router.push("/mbti") 
            } else{
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
        next() {
          this.$store.state.form.data1=this.tableData
          this.postData()
           // this.$router.push("/btr")
        },
      },
      activated(){
        this.$store.state.active=1
      }
    }
  </script>
