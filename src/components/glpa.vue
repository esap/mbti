<template>
  <div>
  <div style="color:red">
  说明：GLPA共有180道题，请为每题选择一个代表你真实想法的分数，在30分钟内完成，谢谢！
  {{amt}}
  </div>
    <el-table height="640" stripe border :data="tableData" style="width: 100%">
    <el-table-column type="index" width="80"></el-table-column>
      <el-table-column prop="desc" label="倾向A"></el-table-column>
      <el-table-column label="倾向选择" width="540">     
        <template scope="scope">
            <el-radio-group v-model="scope.row.vab" @change="v=>{
                scope.row.a=(v=='a'?1:0)
                scope.row.b=(v=='b'?1:0)
                scope.row.c=(v=='c'?1:0)
                scope.row.d=(v=='d'?1:0)
                scope.row.e=(v=='e'?1:0)
              }">
              <el-radio class="radio" label="a">特别同意A</el-radio>
              <el-radio class="radio" label="b">比较同意A</el-radio>
              <el-radio class="radio" label="c">中立</el-radio>
              <el-radio class="radio" label="d">比较同意B</el-radio>
              <el-radio class="radio" label="e">特别同意B</el-radio>
            </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column prop="desc2" label="倾向B"></el-table-column>
    </el-table>
    <br />
  <div class="float-footer">
    <Button type="primary" :loading="loading" size="large" style="margin-top: 12px;" :disabled="!ok" @click="next">下一步</Button>
  </div>
</div>
</template>

  <script>
  import ds from '@/data/glpa'
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
          return this.amt==180
        },
      },
      methods: {
        postData() {
          this.loading=true
          this.$http.post(this.$tokenes("glpa?db=esap2"),this.$store.state.form)
          .then(r=> {
            if(r.data.result){
              this.loading=false
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.$router.push("/end") 
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
        },
      },
      activated(){
        this.$store.state.active=3
      }
    }
  </script>