<template>
  <div>
  <div style="color:red">
  说明：DDI共有 31 道题请在下列 31 项指标中。选出 5 项你最喜欢的；同时选出 5 项你最不喜欢的。
  </div>
  <div style="color:blue">
  <div>最喜欢：{{like}}</div>
  <div>最不喜欢：{{unlike}}</div>
  </div>
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
        prop="name"
        label="项目"
        width="200">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述">
      </el-table-column>
      <el-table-column
        label="倾向选择"
        width="500">     
        <template scope="scope">
            <el-radio-group v-model="scope.row.vab" @change="v=>{
              scope.row.a=(v=='a'?1:0)
              scope.row.b=(v=='b'?1:0)
              }">
              <el-radio class="radio" label="a">最喜欢</el-radio>
              <el-radio class="radio" label="ab">不选择</el-radio>
              <el-radio class="radio" label="b">最不喜欢</el-radio>
            </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <br />
  <div class="float-footer">
    <el-button type="primary" size="large" style="margin-top: 12px;" :disabled="!ok" @click="next">下一步</el-button>
  </div>
</div>
</template>

  <script>
  import ds from '@/data/ddi'
    export default {
      data() {
        return {
          tableData: ds.dataTable,
        }
      },
      computed:{
        like(){
          return this.tableData.reduce((p,v,i,arr)=>v.a+p,0)
        },
        unlike(){
          return this.tableData.reduce((p,v,i,arr)=>v.b+p,0)
        },
        ok(){
          return this.like==5 && this.unlike==5
        }
      },
      methods: {
        postData() {
          this.$http.post(this.$token("ddi"),this.$store.state.form)
          .then(r=> {
            if(r.data.result){
              const h = this.$createElement
              this.$notify({
                title: '提交成功',
                message: h('i', { style: 'color: teal'}, '提交成功')
              });              
              this.$router.push("/glpa") 
            } else{
              this.$notify({
                title: '提交失败',
                message: h('i', { style: 'color: teal'}, r.data.errmsg)
              });
            } 
          })
          .catch(e=> {
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
        this.$store.state.active=1
      }
    }
  </script>
