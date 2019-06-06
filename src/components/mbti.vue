<template>
  <div>
  <div style="color:red">
  说明：MBTI共有74道题，在15分钟内完成！
请注意，题目的答案无对错之分，你不需要考虑哪个答案“应该”更好，而且不要在任何问题上思考太久，而是应该凭你心里的第一反应做出选择。如果你觉得在不同的情境里，两个答案或许都能反映你的倾向，请选择一个对于你的行为方式来说最自然、最顺畅和最从容的答案。
  </div>
  {{amt}}
    <el-table
      height="600"
      stripe border
      :data="tableData"
      style="width: 100%">
    <el-table-column
      type="index"
      width="80">
    </el-table-column>
      <el-table-column
        prop="desc"
        label="试题">
      </el-table-column>
      <el-table-column
        prop="aa"
        label="倾向A">
      </el-table-column>
      <el-table-column
        label="倾向选择"
        width="540">     
        <template scope="scope">
            <el-radio-group v-model="scope.row.vab" @change="v=>{
              scope.row.a=(v=='a'?1:0)
              scope.row.b=(v=='b'?1:0)
              scope.row.c=(v=='c'?1:0)
              scope.row.d=(v=='d'?1:0)
              scope.row.e=(v=='e'?1:0)
              }">
              <el-radio class="radio" label="a">特别符合A</el-radio>
              <el-radio class="radio" label="b">比较符合A</el-radio>
              <el-radio class="radio" label="c">中立</el-radio>
              <el-radio class="radio" label="d">比较符合B</el-radio>
              <el-radio class="radio" label="e">特别符合B</el-radio>
            </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        prop="bb"
        label="倾向B">
      </el-table-column>
    </el-table>
    <br />
  <div class="float-footer">
    <Button type="primary" :loading="loading" style="margin-top: 12px;" :disabled="!ok" @click="next">下一步</Button>
  </div>
  </div>
</template>

  <script>
  import ds from '@/data/mbti'
    export default {
      data() {
        return {
          tableData: ds.dataTable,
          loading: false
        }
      },
      computed:{
        amt(){
          return this.tableData.reduce((p,v,i,arr)=> v.a+v.b+v.c+v.d+v.e+p,0)
        },
        ok(){
          // return true
          return this.amt==74
        },
      },
      methods: {
        postData() {
          this.loading=true
          this.$http.post(this.$token("mbti"),this.$store.state.form)
          .then(r=> {
            if(r.data.result){
              this.loading=false
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.$router.push("/glpa") 
            } else{
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
        next() {
          this.$store.state.form.data1=this.tableData
          this.postData()
           // this.$router.push("/vda")
        },
      },
      activated(){
        this.$store.state.active=2
      }
    }
  </script>